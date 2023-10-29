import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ locals, cookies }) => {
  const uid = locals.userID;

  if (!uid) {
    throw redirect(301, "/");
  }

  const data = cookies.get("test");
  return { data };
}) satisfies PageServerLoad;

export const actions = {
  rename: async ({ request, cookies }) => {
    const formData = await request.formData();
    const data = formData.get("name") as string;

    cookies.set("test", data);
  },
  capitalize: async ({ cookies }) => {
    const data = cookies.get("test") as string;
    cookies.set("test", data.toUpperCase());
  },
  inverse: async ({ cookies }) => {
    const data = cookies.get("test") as string;
    cookies.set("test", data.split("").reverse().join(""));
  },
} satisfies Actions;
