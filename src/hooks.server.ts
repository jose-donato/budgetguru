import { type RequestEvent, redirect, type Handle } from "@sveltejs/kit";

import { jwtVerify, createRemoteJWKSet } from "jose";
import { env } from "$env/dynamic/public";

const hankoApiUrl = env.PUBLIC_HANKO_API_URL;

const authenticatedUser = async (event: RequestEvent) => {
    const { cookies } = event;
    const hanko = cookies.get("hanko");
    const JWKS = createRemoteJWKSet(
        new URL(`${hankoApiUrl}/.well-known/jwks.json`)
    );


    try {
        await jwtVerify(hanko ?? "", JWKS);
        return true;
    } catch {
        return false;
    }
};

export const handle: Handle = async ({ event, resolve }) => {
    const verified = await authenticatedUser(event);


    saveLastUrl(event);
    if (event.url.pathname.startsWith("/app") && !verified) {
        throw redirect(303, "/login");
    }

    const response = await resolve(event);
    return response;
};


const saveLastUrl = async (event: RequestEvent) => {
    const { cookies } = event;
    const lastUrl = cookies.get("lastUrl");
    if (event.url.pathname.startsWith("/app") && lastUrl !== event.url.pathname) {
        console.log("hooks: saving lastUrl", event.url.pathname, "previous", lastUrl)
        cookies.set("lastUrl", event.url.pathname, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });
    }
}
