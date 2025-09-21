import { Router } from "express";

import { generateChatCompletion, ChatServiceConfigurationError } from "../services/chatService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body ?? {};

    if (typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "The request body must include a non-empty 'message' field." });
    }

    const result = await generateChatCompletion({ message, history });
    return res.json(result);
  } catch (error) {
    if (error instanceof ChatServiceConfigurationError) {
      return res.status(503).json({ error: error.message });
    }

    console.error("[chat] failed to generate response", error);
    return res.status(500).json({ error: "Unable to generate assistant response right now." });
  }
});

export default router;