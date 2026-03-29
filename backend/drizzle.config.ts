import { defineConfig } from 'drizzle-kit';
import { loadEnvFile } from 'node:process';


if (process.env.DB_PATH === undefined) {
  loadEnvFile("../.env");
}

export default defineConfig({
  schema: './src/drizzle/drizzle.schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_PATH!,
  },
});