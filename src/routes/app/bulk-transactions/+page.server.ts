import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { insertTransactionSchemaForm, transactions } from '$lib/db/schema';
import type { z } from 'zod';
import { db } from '$lib/db/utils';
import { decodeJwt } from 'jose';

type TransactionForm = z.infer<typeof insertTransactionSchemaForm> & { userId: string };

export const actions = {
    default: async ({ request, cookies }) => {
        let userId = "" as string | undefined;
        try {
            const hanko = cookies.get("hanko");
            const payload = await decodeJwt(hanko ?? "");
            userId = payload.sub;
            if (!userId) {
                throw new Error("no userId")
            }
        } catch (error) {
            console.error(error);
            return fail(400);
        }

        const formData = await request.formData();
        const file = formData.get('csv');
        if (!file || !(file instanceof Blob)) {
            return fail(400);
        }
        const fileData = await file.text();

        const lines = fileData.split('\n');
        const headers = lines[0].split(',');

        const tx = [] as TransactionForm[];

        lines.slice(1).forEach((line: string) => {
            const values = line.split(',');
            const obj = {} as Record<string, any>
            headers.forEach((header: string, i: number) => {
                const lowerHeader = header.toLowerCase();
                if (header === 'AMOUNT') {
                    obj[lowerHeader] = parseFloat(values[i]);
                } else if (header === 'DATE') {
                    obj[lowerHeader] = new Date(parseInt(values[i]));
                } else {
                    obj[lowerHeader] = values[i];
                }
            });

            const parsed = insertTransactionSchemaForm.safeParse(obj);
            if (parsed.success) {
                tx.push({
                    ...parsed.data,
                    userId
                });
            }
        })

        console.log("POST /app/bulk-transactions", `parsed ${tx.length} transactions`)

        if (tx.length === 0) {
            return fail(400);
        }

        await db.insert(transactions).values(tx).execute();

        throw redirect(303, '/app?toast=bulk&statusToast=success')
    }
} satisfies Actions;