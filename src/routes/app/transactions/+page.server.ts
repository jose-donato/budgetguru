import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { decodeJwt } from 'jose';
import { db } from '$lib/db/utils';
import { transactions } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load = (async ({ cookies }: RequestEvent) => {
    const hanko = cookies.get("hanko")
    const payload = await decodeJwt(hanko ?? "");

    if (payload.sub) {
        const tx = await db.select().from(transactions).where(eq(transactions.userId, payload.sub)).all()

        return {
            transactions: tx,
        }
    }

    return {
        transactions: [],
    }
}) satisfies PageServerLoad;