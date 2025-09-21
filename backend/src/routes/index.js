import { Router } from "express";

import chatRouter from "./chat.js";
import healthRouter from "./health.js";
import helloRouter from "./hello.js";

const router = Router();

router.use("/health", healthRouter);
router.use("/hello", helloRouter);
router.use("/chat", chatRouter);

export default router;
