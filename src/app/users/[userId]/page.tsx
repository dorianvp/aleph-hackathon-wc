import { getReducedUserData, getUserData } from "@/lib/actions/user";
import { getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

export default async function Profile({ params }: { params: { userId: string } }) {
	const userData = await getReducedUserData(params.userId)

	return (
		<section>
			<h1>Profile</h1>
			<pre>{JSON.stringify(userData, null, 2)}</pre>
		</section>
	)
}