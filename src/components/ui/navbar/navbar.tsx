'use client'

import Link from "next/link";
import { Button } from "../button";
import { SignOutButton } from "@/components/signout-button";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";

export function NavBar() {
	const { status } = useSession();
	return (
		<header className="px-4 lg:px-6 h-14 flex items-center">
			<Link className="flex items-center justify-center" href="#" aria-label="GiveHope Home">
				<span className="text-xl md:text-2xl font-bold text-primary">Patronix</span>
			</Link>
			<nav className="ml-auto flex items-center gap-4 sm:gap-6">
				<div className="flex items-center gap-4 sm:gap-6">
					<Link className="text-sm font-medium hover:underline underline-offset-4" href={"/campaigns"}>
						Campaigns
					</Link>
				</div>
				{
					status === "authenticated" ? (
						<SignOutButton>
							Sign Out
						</SignOutButton>
					) : (
						<Button className="flex" variant="outline" size="sm" asChild>
							<Link href={"/signup"}>
								Sign Up / Log In
							</Link>
						</Button>
					)
				}
				<Button className="hidden" variant="ghost" size="icon">
					<Menu className="h-6 w-6" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</nav>
		</header>
	)
}