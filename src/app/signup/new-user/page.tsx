'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { createUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
})

export default function NewUser() {
	const session = useSession();
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: ""
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			await createUser(session.data?.user?.name as `0x${string}`, data.username)
			router.push('/');
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<section className="grid min-h-screen place-items-center">
			<Form  {...form}>
				<Card>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
						<CardHeader>
							<CardTitle className="text-2xl">Claim your username</CardTitle>
							<CardDescription>
								Start connecting with great people around you.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<div className="grid gap-2">
											<FormLabel htmlFor="password">Username/alias</FormLabel>
											<FormControl>
												<Input id="username" type="text" placeholder="yourusername" required {...field} />
											</FormControl>
											<FormMessage />
										</div>

									</FormItem>
								)}
							/>
							<Button className="w-full" type="submit">
								Sign in
							</Button>
						</CardContent>
					</form>
				</Card>
			</Form>
		</section >
	)
}
