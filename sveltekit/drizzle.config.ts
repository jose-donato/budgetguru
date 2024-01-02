import { type Config } from 'drizzle-kit';

export default {
    out: './migrations',
    schema: './src/lib/db/schema.ts',
    breakpoints: true,
} satisfies Config;