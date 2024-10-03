import 'reflect-metadata';
import express, { json } from 'express';
import { routes } from './api/routes';
import { connectDB } from './infra/database/db';
import dotenv from 'dotenv';

export const app = express();

app.use(json());

dotenv.config();

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use('/api/v1', routes);

app.listen(3030, () => {
  console.log(`Server is running on port 3030`);
});