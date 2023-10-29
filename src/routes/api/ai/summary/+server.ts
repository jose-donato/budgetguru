import { PUBLIC_HANKO_API_URL } from "$env/static/public";
import { json } from "@sveltejs/kit";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { RequestEvent } from "./$types";

export async function POST({
	request,
	cookies
}: RequestEvent) {
	const hanko = cookies.get("hanko");
	const data = await request.json();
	try {
		const JWKS = createRemoteJWKSet(
			new URL(`${PUBLIC_HANKO_API_URL}/.well-known/jwks.json`)
			);
			await jwtVerify(hanko ?? "", JWKS);
		} catch {
			return json({
				error: "Unauthorized"
			})
		}
	const { totalBalance, income, expenses, OPEN_AI_KEY } = data


	const prompt = makePrompt(totalBalance, income, expenses, "year", "american", "35-40")

        console.log("AI Summary Prompt:", prompt)

        const res = await fetchOpenAI(prompt, true, OPEN_AI_KEY)

				return json({
					summary: res?.choices?.[0]?.message?.content
				})
}

function makePrompt(totalBalance: number, income: number, expenses: number, period: "year", comparePerson: string, compareAge: string) {
	let prompt = `Based on the following values relative to the previous ${period} give me a brief overview of my financial situation. Also compare to the average ${comparePerson} with age ${compareAge} - try to give an estimate even without more context.`
	prompt += `\nTotal Balance: ${totalBalance} USD`
	prompt += `\nIncome: ${income} USD`
	prompt += `\nExpenses: ${expenses} USD`
	prompt += "\n\nSuccint summary without the values above:"
	return prompt
}

async function fetchOpenAI(prompt: string, cached = true, OPEN_AI_KEY?: string) {
	if (cached) {
			return {
					"id": "chatcmpl-8Ae2u3sJgYjxkDLCjhLE4ULLOvO9X",
					"object": "chat.completion",
					"created": 1697547908,
					"model": "gpt-3.5-turbo-0613",
					"choices": [
							{
									"index": 0,
									"message": {
											"role": "assistant",
											"content": "Based on the provided values, it seems that your financial situation is quite positive. With a total balance of $986,386, your income of $732,734 is significantly higher than your expenses of $253,652. This indicates that you have a relatively high level of savings and are likely managing your finances well.\n\nIn comparison to the average American in the age range of 35-40, your financial situation appears to be above average."
									},
									"finish_reason": "length"
							}
					],
					"usage": {
							"prompt_tokens": 113,
							"completion_tokens": 100,
							"total_tokens": 213
					}
			}
	}
	if (!OPEN_AI_KEY) throw new Error("OPEN_AI_KEY is not set")
	const res = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${OPEN_AI_KEY}`,
			},
			body: JSON.stringify({
					messages: [
							{
									role: "system",
									content: "I'm an AI chatbot designed to assist you with personal finances. I'll always keep it as succint and direct as possible."
							},
							{
									role: "user",
									content: prompt
							},
					],
					max_tokens: 100,
					temperature: 0.9,
					top_p: 1,
					model: "gpt-3.5-turbo",
			}),
	});
	const data = await res.json();

	return data
}
