import { sql } from "@vercel/postgres";
export async function GET(req: Request) {
	await sql`CREATE TABLE Users ( username varchar(255), id INTEGER PRIMARY KEY);`;
	return new Response('ok');
}