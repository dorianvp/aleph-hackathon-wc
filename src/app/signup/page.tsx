'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { z } from "zod"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { getUserData } from "@/lib/actions/user";

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
})

export default function NewUser() {
	const { data } = useSession();
	const router = useRouter();

	useEffect(() => {
		// fetch user info
		console.log(data);

		if (data?.user?.name) {
			getUserData(data.user.name as string).then((data) => {
				console.log("DATA", data);

				if (!data?.username) {
					router.push('/signup/new-user');
				} else {
					router.push('/');
				}
			})
		}
	}, [data, router])

	return (
		<section className="grid min-h-screen place-items-center">
			<Card>
				<div className="w-full max-w-sm">
					<CardHeader className="justify-center items-center">
						<CardTitle className="text-2xl">Connect with Worldcoin</CardTitle>
						<CardDescription>
							Start connecting with great people around you.
						</CardDescription>
						<Image
							alt="Worldcoin logo"
							className="h-12 w-12"
							height={48}
							src="/images/wld_logo.png"
							width={48}
						></Image>
					</CardHeader>
					<CardContent className="grid gap-4">
						<Button className="w-full" onClick={() => {
							signIn()
							router.push('/signup/new-user');
						}}>
							Sign in with WorldID
						</Button>

					</CardContent>
				</div>
			</Card>
		</section >
	)
}