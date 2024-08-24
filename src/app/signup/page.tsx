import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getUserData } from "@/lib/actions/user"
import { getSession } from "@auth0/nextjs-auth0"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function SignUp() {
	const user = await getSession();
	console.log("HERE USER", user);

	if (user) {
		if (!user.accessToken) {
			redirect('/api/auth/login')
		}
		const userData = await getUserData(user.user.sub as string);
		if (userData.username) {
			redirect('/profile')
		} else {
			redirect('/signup/new-user')
		}
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
