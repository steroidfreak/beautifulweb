import fs from "fs/promises";
import path from "path";

import {
  getEmbeddingModel,
  getOpenAIClient
} from "../lib/openaiClient.js";

const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx", ".markdown", ".txt"]);

let cachedChunks = null;
let loadingPromise = null;

const resolveKnowledgeBaseDir = () => {
  const configuredPath = process.env.KNOWLEDGE_BASE_DIR;
  return configuredPath
    ? path.resolve(process.cwd(), configuredPath)
    : path.resolve(process.cwd(), "knowledge-base");
};

const chunkText = (text, chunkSize = 1200, overlap = 200) => {
  const normalized = text.replace(/\r\n/g, "\n").trim();

  if (!normalized) {
    return [];
  }

  if (chunkSize <= overlap) {
    throw new Error("chunkSize must be greater than overlap for chunkText");
  }

  const chunks = [];
  let start = 0;

  while (start < normalized.length) {
    const end = Math.min(normalized.length, start + chunkSize);
    const chunk = normalized.slice(start, end).trim();

    if (chunk) {
      chunks.push(chunk);
    }

    if (end === normalized.length) {
      break;
    }

    start += chunkSize - overlap;
  }

  return chunks;
};

const collectKnowledgeFiles = async (dir, baseDir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await collectKnowledgeFiles(fullPath, baseDir);
      files.push(...nested);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push({
        path: fullPath,
        relativePath: path.relative(baseDir, fullPath)
      });
    }
  }

  return files;
};

const loadRawChunks = async () => {
  const kbDir = resolveKnowledgeBaseDir();

  try {
    await fs.access(kbDir);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const knowledgeFiles = await collectKnowledgeFiles(kbDir, kbDir);
  const chunks = [];

  for (const file of knowledgeFiles) {
    const content = await fs.readFile(file.path, "utf-8");
    const fileChunks = chunkText(content);

    fileChunks.forEach((chunk, index) => {
      chunks.push({
        id: `${file.relativePath}#${index}`,
        source: file.relativePath,
        chunkIndex: index,
        content: chunk
      });
    });
  }

  return chunks;
};

const embedChunks = async (rawChunks) => {
  if (rawChunks.length === 0) {
    return [];
  }

  const openai = getOpenAIClient();
  const embeddingModel = getEmbeddingModel();
  const inputs = rawChunks.map((chunk) => chunk.content);

  const response = await openai.embeddings.create({
    model: embeddingModel,
    input: inputs
  });

  return rawChunks.map((chunk, index) => ({
    ...chunk,
    embedding: response.data[index].embedding
  }));
};

const loadKnowledgeBase = async () => {
  const rawChunks = await loadRawChunks();

  if (rawChunks.length === 0) {
    return [];
  }

  const embedded = await embedChunks(rawChunks);
  return embedded;
};

const cosineSimilarity = (a, b) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i += 1) {
    const valueA = a[i];
    const valueB = b[i];

    dotProduct += valueA * valueB;
    normA += valueA * valueA;
    normB += valueB * valueB;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB) || 1e-8;

  return dotProduct / denominator;
};

const getKnowledgeChunks = async () => {
  if (cachedChunks) {
    return cachedChunks;
  }

  if (!loadingPromise) {
    loadingPromise = loadKnowledgeBase()
      .then((chunks) => {
        cachedChunks = chunks;
        return cachedChunks;
      })
      .finally(() => {
        loadingPromise = null;
      });
  }

  return loadingPromise;
};

export const retrieveRelevantChunks = async (query, { topK = 4 } = {}) => {
  const knowledgeChunks = await getKnowledgeChunks();

  if (!knowledgeChunks || knowledgeChunks.length === 0) {
    return [];
  }

  const openai = getOpenAIClient();
  const embeddingModel = getEmbeddingModel();

  const embeddingResponse = await openai.embeddings.create({
    model: embeddingModel,
    input: query
  });

  const queryEmbedding = embeddingResponse.data[0].embedding;

  const scored = knowledgeChunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  scored.sort((a, b) => b.score - a.score);

  const limit = Math.min(topK, scored.length);
  return scored.slice(0, limit);
};

export const invalidateKnowledgeCache = () => {
  cachedChunks = null;
  loadingPromise = null;
};
