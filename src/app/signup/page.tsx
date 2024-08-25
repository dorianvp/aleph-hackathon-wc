'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormLabel,
} from "@/components/ui/form"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
})

export default function NewUser() {
	const { data: user } = useSession();
	const router = useRouter();

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
							// signIn()
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