import OpenAI from "openai";

let client;

export const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set.");
  }

  if (!client) {
    client = new OpenAI({ apiKey });
  }

  return client;
};

export const getChatModel = () => process.env.OPENAI_MODEL || "gpt-5";

export const getEmbeddingModel = () =>
  process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
