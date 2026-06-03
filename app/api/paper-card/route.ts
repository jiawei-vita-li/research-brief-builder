import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import {
  MAX_PAPER_TEXT_LENGTH,
  MAX_USER_BACKGROUND_LENGTH,
  MIN_PAPER_TEXT_LENGTH,
} from "@/lib/constants";
import { verifyEvidenceQuotes } from "@/lib/grounding/verify-quotes";
import {
  buildPaperCardUserMessage,
  PAPER_CARD_SYSTEM_PROMPT,
} from "@/lib/llm/paper-card-prompt";
import {
  normalizePaperCardLlmOutput,
  paperCardLlmSchema,
  toPaperCard,
} from "@/lib/schemas/paper-card";

export const runtime = "nodejs";

const requestBodySchema = z.object({
  paperText: z.string(),
  userBackground: z.string().optional(),
});

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

  const parsed = requestBodySchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(
      "Request body must include paperText (string). userBackground is optional.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const paperText = parsed.data.paperText.trim();
  const userBackground = parsed.data.userBackground?.trim();

  if (paperText.length < MIN_PAPER_TEXT_LENGTH) {
    return jsonError(
      `Paper text is too short. Paste at least ${MIN_PAPER_TEXT_LENGTH} characters.`,
      400,
      "TEXT_TOO_SHORT"
    );
  }

  if (paperText.length > MAX_PAPER_TEXT_LENGTH) {
    return jsonError(
      `Paper text exceeds the maximum of ${MAX_PAPER_TEXT_LENGTH} characters.`,
      400,
      "TEXT_TOO_LONG"
    );
  }

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

  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.parse({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: PAPER_CARD_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildPaperCardUserMessage(paperText, userBackground),
        },
      ],
      response_format: zodResponseFormat(paperCardLlmSchema, "paper_card"),
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

    const validated = paperCardLlmSchema.safeParse(llmOutput);
    if (!validated.success) {
      return jsonError(
        "Model response failed schema validation.",
        502,
        "SCHEMA_VALIDATION_ERROR"
      );
    }

    const normalized = normalizePaperCardLlmOutput(validated.data);
    const paperCard = toPaperCard(`paper-${randomUUID()}`, normalized);
    const groundingResults = verifyEvidenceQuotes(
      paperText,
      paperCard.evidence_quotes
    );

    return NextResponse.json({ paperCard, groundingResults });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error calling the LLM API.";
    console.error("[paper-card]", err);
    return jsonError(message, 502, "LLM_ERROR");
  }
}
