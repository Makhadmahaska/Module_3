import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string(),
  FIREBASE_PROJECT_ID: z.string()
});

export const env = envSchema.parse(process.env);
