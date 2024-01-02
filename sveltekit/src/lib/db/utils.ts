import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

const { TURSO_URL, TURSO_API_TOKEN } = env;

const client = createClient({ url: TURSO_URL ?? "", authToken: TURSO_API_TOKEN ?? "" });

const db = drizzle(client);

export { db }