import { getChatModel, getOpenAIClient } from "../lib/openaiClient.js";
import { retrieveRelevantChunks } from "../rag/knowledgeBase.js";

const BASE_SYSTEM_PROMPT = `You are the BeautifulWeb on-site assistant. Answer questions with concise, high-signal language. Use the provided knowledge base excerpts verbatim when they are relevant. If the context does not cover the answer, say so candidly and suggest where the user can look next. Encourage collaboration and follow-up questions.`;

export class ChatServiceConfigurationError extends Error {
  constructor(message = "The chat assistant is not configured. Please set the OPENAI_API_KEY environment variable.") {
    super(message);
    this.name = "ChatServiceConfigurationError";
  }
}

const sanitizeHistory = (history = []) => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((entry) =>
      entry &&
      (entry.role === "user" || entry.role === "assistant") &&
      typeof entry.content === "string" &&
      entry.content.trim().length > 0
    )
    .map((entry) => ({
      role: entry.role,
      content: entry.content.trim()
    }));
};

export const generateChatCompletion = async ({ message, history = [] }) => {
  if (typeof message !== "string" || message.trim().length === 0) {
    throw new Error("A non-empty user message is required.");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new ChatServiceConfigurationError();
  }

  const openai = getOpenAIClient();
  const model = getChatModel();
  const trimmedMessage = message.trim();
  const relevantChunks = await retrieveRelevantChunks(trimmedMessage, { topK: 4 });

  const contextBlock = relevantChunks.length
    ? relevantChunks
      .map((chunk) => `Source: ${chunk.source}\n${chunk.content}`)
      .join("\n\n---\n\n")
    : "No relevant knowledge base entries were found for this query.";

  const promptMessages = [
    {
      role: "system",
      content: `${BASE_SYSTEM_PROMPT}\n\nKnowledge base context:\n${contextBlock}`
    },
    ...sanitizeHistory(history),
    {
      role: "user",
      content: trimmedMessage
    }
  ];

  const requestOptions = {
    model,
    messages: promptMessages
  };

  if (/^gpt-(3\.5|4)/i.test(model)) {
    requestOptions.temperature = 0.2;
  }

  let response;
  try {
    response = await openai.chat.completions.create(requestOptions);
  } catch (error) {
    if (
      requestOptions.temperature !== undefined &&
      error?.code === "unsupported_value" &&
      error?.param === "temperature"
    ) {
      delete requestOptions.temperature;
      response = await openai.chat.completions.create(requestOptions);
    } else {
      throw error;
    }
  }

  const assistantMessage = response.choices?.[0]?.message?.content?.trim();

  return {
    reply: assistantMessage || "I'm not sure how to respond yet.",
    sources: relevantChunks.map((chunk) => ({
      id: chunk.id,
      source: chunk.source,
      score: chunk.score,
      snippet: chunk.content.slice(0, 280)
    }))
  };
};

