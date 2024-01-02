import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const { TURSO_URL, TURSO_API_TOKEN } = process.env;

console.log({ TURSO_URL, TURSO_API_TOKEN })

const client = createClient({ url: TURSO_URL ?? "", authToken: TURSO_API_TOKEN ?? "" });

const db = drizzle(client);

export { db };
