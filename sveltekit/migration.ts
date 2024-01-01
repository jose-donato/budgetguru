import { migrate } from 'drizzle-orm/libsql/migrator';

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const {
    TURSO_URL,
    TURSO_API_TOKEN,
} = process.env;

const client = createClient({ url: TURSO_URL ?? "", authToken: TURSO_API_TOKEN ?? "" });
const db = drizzle(client);

async function main() {
    await migrate(db, {
        migrationsFolder: './migrations',
    });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});