import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateRouter } from './routes/generate.js';
import { testConnectionRouter } from './routes/testConnection.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api/generate', generateRouter);
app.use('/api/test-connection', testConnectionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
