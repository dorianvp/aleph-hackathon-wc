'use server'
import { sql } from "@vercel/postgres";

export async function getUserData(sub: string) {
	const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${sub}`, {
		headers: {
			'Authorization': `Bearer ${process.env.AUTH0_MANAGEMENT_API}`
		}
	});

	if (!response.ok) {
		console.log(response);
		throw new Error(response.statusText)
	}
	const user = await response.json();
	const dbUser = await sql`SELECT * FROM Users WHERE sub = ${sub}`;

	const data = {
		...user,
		...dbUser.rows.map
	}

	console.log(dbUser);

	return {
		...user,
		username: dbUser.rows[0].username
	}
}

export async function getReducedUserData(username: string) {
	const dbUser = await sql`SELECT * FROM Users WHERE username = ${username}`;
	return {
		username: dbUser.rows[0].username
	}
}

export async function getUsers(): Promise<any> {
	const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL as string;

	const response = await fetch(`${AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
		headers: {
			'Authorization': `Bearer ${process.env.AUTH0_MANAGEMENT_API}`
		}
	});
	const users = await response.json();
	return users;
}