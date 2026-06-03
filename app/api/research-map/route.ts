import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { MAX_USER_BACKGROUND_LENGTH } from "@/lib/constants";
import {
  API_FEW_CARDS_WARNING,
  buildResearchMapUserMessage,
  RESEARCH_MAP_SYSTEM_PROMPT,
} from "@/lib/llm/research-map-prompt";
import {
  normalizeResearchMapLlmOutput,
  researchMapLlmSchema,
} from "@/lib/schemas/research-map";
import { researchMapRequestSchema } from "@/lib/schemas/paper-card-input";

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

  const parsed = researchMapRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(
      "Request must include paperCards (array, at least 1 item).",
      400,
      "VALIDATION_ERROR"
    );
  }

  const { paperCards, userBackground: rawBackground } = parsed.data;
  const userBackground = rawBackground?.trim();

  if (
    userBackground &&
    userBackground.length > MAX_USER_BACKGROUND_LENGTH
  ) {
    return jsonError(
      `User background exceeds the maximum of ${MAX_USER_BACKGROUND_LENGTH} characters.`,
      400,
      "BACKGROUND_TOO_LONG"
    );
  }

  const qualityWarning =
    paperCards.length < 2 ? API_FEW_CARDS_WARNING : undefined;

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.parse({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.25,
      messages: [
        { role: "system", content: RESEARCH_MAP_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildResearchMapUserMessage(paperCards, userBackground),
        },
      ],
      response_format: zodResponseFormat(researchMapLlmSchema, "research_map"),
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

    const validated = researchMapLlmSchema.safeParse(llmOutput);
    if (!validated.success) {
      return jsonError(
        "Model response failed schema validation.",
        502,
        "SCHEMA_VALIDATION_ERROR"
      );
    }

    const researchMap = normalizeResearchMapLlmOutput(validated.data);

    return NextResponse.json({
      researchMap,
      ...(qualityWarning ? { qualityWarning } : {}),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error calling the LLM API.";
    console.error("[research-map]", err);
    return jsonError(message, 502, "LLM_ERROR");
  }
}
