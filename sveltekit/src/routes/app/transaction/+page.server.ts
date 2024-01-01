import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { insertTransactionSchemaForm, transactions } from "$lib/db/schema";
import { decodeJwt } from 'jose';
import { db } from '$lib/db/utils';

export const load = (async ({ url }) => {
    const isExpense = url.searchParams.get("type") === "expense";
    const form = await superValidate(insertTransactionSchemaForm);

    form.data.type = isExpense ? "expense" : "income";

    return { form };
}) satisfies PageServerLoad;


export const actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, insertTransactionSchemaForm);
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

            const tx = await db.insert(transactions).values({
                ...form.data,
                userId,
            }).returning().get();

            console.log("POST app/transaction: created transaction", tx);
        } catch (error) {
            console.error(error);
            return fail(400);
        }

        throw redirect(303, '/app');
    }
} satisfies Actions;