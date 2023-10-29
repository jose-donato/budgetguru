import { decodeJwt } from 'jose';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db/utils';
import { updateTransactionSchema, transactions } from '$lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({ params, cookies }) => {
    const hanko = cookies.get("hanko")
    const payload = await decodeJwt(hanko ?? "");
    const txId = params.transactionId;
    const form = await superValidate(updateTransactionSchema);

    if (payload.sub) {
        const tx = await db.select().from(transactions).where(and(eq(transactions.userId, payload.sub), eq(transactions.id, Number(txId)))).get()
        console.log("TX", tx)
        return {
            form: {
                ...form,
                data: {
                    ...form.data,
                    ...tx
                }
            }
        }
    }
    return {
        form
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, cookies, params }) => {
        const form = await superValidate(request, updateTransactionSchema);

        if (!form.valid) {
            return fail(400, {
                form
            });
        }
        try {
            const hanko = cookies.get("hanko");
            const payload = await decodeJwt(hanko ?? "");
            const userId = payload.sub;

            if (!userId || typeof userId !== "string") throw new Error("No user id")

            if (form.data.action === "delete") {
                await db.delete(transactions).where(and(eq(transactions.userId, userId), eq(transactions.id, Number(params.transactionId)))).run()
                console.log("POST app/transactions/[id]: deleted transaction");
            } else {
                const { action, ...data } = form.data;
                const tx = await db.update(transactions).set({
                    ...data,
                    userId,
                }).where(eq(transactions.id, Number(params.transactionId))).run()
                console.log("POST app/transactions/[id]: updated transaction", tx);
            }

        } catch (error) {
            console.error(error);
            return fail(400);
        }

        throw redirect(303, '/app/transactions' +
            (form.data.action === "delete" ? "?toast=delete-transaction&statusToast=success" : "?toast=update-transaction&statusToast=success")
        );
    }
} satisfies Actions;