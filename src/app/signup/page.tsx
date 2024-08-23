import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getUserData } from "@/lib/actions/user"
import { getSession, Session } from "@auth0/nextjs-auth0"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function SignUp() {
	const { user } = (await getSession()) as Session;
	if (user) {
		const userData = await getUserData(user.sub as string);
		if (userData.username) {
			redirect('/profile')
		} else {
			redirect('/signup/new-user')
		}
	} else {
		redirect('/api/auth/login')
	}

	return (
		<section className="grid min-h-screen place-items-center">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">SignUp</CardTitle>
					<CardDescription>
						Connect with great people around you.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Button asChild className="w-full">
						<Link href={'/api/auth/login'}>
							Sign in
						</Link>
					</Button>

				</CardContent>
			</Card>
		</section>
	)
}
