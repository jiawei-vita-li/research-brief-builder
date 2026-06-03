import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  MAX_USER_BACKGROUND_LENGTH,
  MIN_USER_BACKGROUND_LENGTH,
} from "@/lib/constants";
import {
  BACKGROUND_TOO_SHORT_MESSAGE,
  buildFitEmailUserMessage,
  FIT_EMAIL_SYSTEM_PROMPT,
} from "@/lib/llm/fit-email-prompt";
import {
  fitEmailResponseSchema,
  normalizeFitEmailOutput,
} from "@/lib/schemas/fit-email";
import { fitEmailRequestSchema } from "@/lib/schemas/paper-card-input";
import { normalizeResearchMapLlmOutput } from "@/lib/schemas/research-map";

export const runtime = "nodejs";

function jsonError(message: string, status: number, code?: string) {
  return NextResponse.json(
    { error: message, code: code ?? "REQUEST_ERROR" },
    { status }
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    return jsonError(
      "OPENAI_API_KEY is not configured. Add it to .env.local (see .env.example).",
      503,
      "CONFIG_ERROR"
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body.", 400, "INVALID_JSON");
  }

  const parsed = fitEmailRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(
      "Request must include paperCards (≥1), researchMap, and userBackground.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const { paperCards, researchMap: rawMap, userBackground: rawBg } = parsed.data;
  const userBackground = rawBg.trim();

  if (userBackground.length < MIN_USER_BACKGROUND_LENGTH) {
    return jsonError(BACKGROUND_TOO_SHORT_MESSAGE, 400, "BACKGROUND_TOO_SHORT");
  }

  if (userBackground.length > MAX_USER_BACKGROUND_LENGTH) {
    return jsonError(
      `User background exceeds the maximum of ${MAX_USER_BACKGROUND_LENGTH} characters.`,
      400,
      "BACKGROUND_TOO_LONG"
    );
  }

  const researchMap = normalizeResearchMapLlmOutput(rawMap);
  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.parse({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: FIT_EMAIL_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildFitEmailUserMessage(
            paperCards,
            researchMap,
            userBackground
          ),
        },
      ],
      response_format: zodResponseFormat(fitEmailResponseSchema, "fit_email"),
    });

    const message = completion.choices[0]?.message;
    if (message?.refusal) {
      return jsonError(
        `Model refused the request: ${message.refusal}`,
        422,
        "LLM_REFUSAL"
      );
    }

    const llmOutput = message?.parsed;
    if (!llmOutput) {
      return jsonError(
        "Model returned an empty or unparseable response.",
        502,
        "LLM_PARSE_ERROR"
      );
    }

    const validated = fitEmailResponseSchema.safeParse(llmOutput);
    if (!validated.success) {
      return jsonError(
        "Model response failed schema validation.",
        502,
        "SCHEMA_VALIDATION_ERROR"
      );
    }

    const { fitAnalysis, outreachEmailDraft } = normalizeFitEmailOutput(
      validated.data
    );

    return NextResponse.json({ fitAnalysis, outreachEmailDraft });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Unknown error calling the LLM API.";
    console.error("[fit-email]", err);
    return jsonError(msg, 502, "LLM_ERROR");
  }
}
