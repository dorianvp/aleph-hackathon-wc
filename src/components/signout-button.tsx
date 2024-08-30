'use client'

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton({ children }: { children: ReactNode }) {
	return (
		<Button onClick={() => signOut()}>
			{children}
		</Button>
	)
}