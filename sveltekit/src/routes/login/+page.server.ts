import type { PageServerLoad } from "./$types";

export const load = (async ({ url, cookies }) => {
    const lastUrl = cookies.get("lastUrl") ?? "/app";

    return {
        lastUrl,
    }
}) satisfies PageServerLoad;
