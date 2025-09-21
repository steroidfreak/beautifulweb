import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import apiRouter from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

const port = Number(process.env.PORT) || 5000;
const server = app.listen(port, () => {
  console.log(`[api] listening on port ${port}`);
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('[api] graceful shutdown');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('[api] received termination signal');
    process.exit(0);
  });
});
