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
	const managementApiToken = await getManagementApiToken();

	const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${sub}`, {
		method: 'PATCH',
		headers: {
			'Authorization': `Bearer ${managementApiToken}`,
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

export async function getManagementApiToken() {

	const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			grant_type: 'client_credentials',
			client_id: process.env.AUTH0_MACHINE_CLIENTID, // Your Auth0 client ID
			client_secret: process.env.AUTH0_MACHINE_CLIENTSECRET, // Your Auth0 client secret
			audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
		}),
	});

	if (!response.ok) {
		console.log(response);
		throw new Error('Failed to obtain Management API token');
	}

	const data = await response.json();
	return data.access_token;
}