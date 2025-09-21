import { Router } from 'express';

import healthRouter from './health.js';
import helloRouter from './hello.js';

const router = Router();

router.use('/health', healthRouter);
router.use('/hello', helloRouter);

export default router;
