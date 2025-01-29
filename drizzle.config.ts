import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'drizzle-kit'

// Load environment variables
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: './app/lib/drizzle/schema.ts',
  out: './generated',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});