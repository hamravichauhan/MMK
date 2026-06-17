import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/payload-generated-schema.ts', // This path might vary; see below
  out: './src/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './payload.db',
  },
})