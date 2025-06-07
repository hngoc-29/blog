import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  schema: './src/db/schema.ts',
  out: './src/db/out',
});
