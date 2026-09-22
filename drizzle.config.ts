import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	casing: 'snake_case',
	dbCredentials: { url: process.env.DATABASE_URL ?? 'postgres://localhost:5432/bdayhero' },
	verbose: true,
	strict: true
});
