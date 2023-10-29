import { decodeJwt } from 'jose';
import type { RequestEvent, RequestHandler } from './$types';
import { db } from "$lib/db/utils";
import { users } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    return new Response();
};

export async function POST({
    request,
    cookies
}: RequestEvent) {
    const hanko = cookies.get("hanko");
    const data = await request.json();
    const payload = await decodeJwt(hanko ?? "");

    if (payload.sub !== data.id) {
        return new Response(null, {
            status: 403,
        });
    }

    const userCookie = cookies.get("user");

    if (!userCookie) {
        console.log("POST api/auth: no user cookie found")
        const user = await createUserOrGetUser(data.id, data.email);

        cookies.set("user", JSON.stringify(user), {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
            sameSite: "lax",
        });

        return json(user)
    }
    console.log("POST api/auth: user cookie found")


    return json(userCookie)
}


const createUserOrGetUser = async (id: string, email: string) => {
    const user = await db.select().from(users).where(eq(users.id, id)).get()

    if (!user) {
        console.log("POST api/auth: creating new user")
        const newUser = await db.insert(users).values({
            id,
            email,
        }).returning().get();

        return newUser;
    }

    console.log("POST api/auth: retrieving existing user")
    return user;
}