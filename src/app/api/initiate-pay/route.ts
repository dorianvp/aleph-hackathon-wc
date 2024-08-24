import { NextRequest, NextResponse } from "next/server";
import { Tokens, Network } from '@worldcoin/minikit-js'
import { sql } from "@vercel/postgres";
export type TokensPayload = {
	symbol: Tokens;
	token_amount: string;
};

export type PayCommandInput = {
	reference: string;
	to: string;
	tokens: TokensPayload[];
	network?: Network; // Optional
	description: string;
};


export async function POST(req: NextRequest) {
	const uuid = crypto.randomUUID().replace(/-/g, "");

	// TODO: Store the ID field in your database so you can verify the payment later
	const r = await sql`INSERT INTO Payments (id) VALUES (${uuid})`;
	console.log(r);

	return NextResponse.json({ id: uuid });
}

