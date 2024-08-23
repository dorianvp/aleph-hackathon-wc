'use server'
import { sql } from "@vercel/postgres";
import { getUsers } from "./user";

export async function validUsername(username: string): Promise<boolean> {
	if (username.length < 3) return false;
	const users = await getUsers();
	console.log('users', users);

	const user = users.find((u: any) => u.username === username);
	if (user) return false
	return true
}

export async function createUser(username: string, sub: string) {
	console.log("HELL YEAH");

	const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${sub}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${process.env.AUTH0_MANAGEMENT_API}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user_metadata: {
				username: username
			}
		})
	});
	console.log('response', response);


	const r = await sql`INSERT INTO Users (username, sub) VALUES (${username}, ${sub})`;
	console.log('r', r);
	if (!response.ok) {
		throw new Error(response.statusText)
	}
	const user = await response.json();
	return user
}