import { redirect } from "next/navigation";

export async function GET(req: Request) {
	redirect('/signup');
}