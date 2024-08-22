import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignUp() {
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
