'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/actions/user";

export default function NewUser() {
	const { data } = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getLoader() {
			const { helix } = await import('ldrs')
			helix.register()
		}
		getLoader()
	}, [])

	useEffect(() => {
		if (data?.user?.name) {
			getUserData(data.user.name as string).then((userData) => {
				if (userData?.username) {
					router.push('/');
				} else {
					router.push('/signup/new-user');
				}
			})
		}
	}, [data, router])

	return (
		<section className="grid min-h-screen place-items-center">
			<Card>
				<div className="w-full max-w-sm flex flex-col justify-center items-center">
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
						{
							data?.user || loading ? (
								<l-helix />
							) : (
								<Button className="w-full" onClick={() => {
									setLoading(true);
									signIn();
								}}>
									Sign in with WorldID
								</Button>
							)
						}
					</CardContent>
				</div>
			</Card>

		</section >
	)
}