import { getUserData } from "@/lib/actions/user";
import { getSession, Session } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

export default async function Profile() {
	const { user } = (await getSession()) as Session;

	const userData = await getUserData(user?.sub as string);

	return (
		<section>
			<h1>Profile</h1>
			<pre>{JSON.stringify(userData, null, 2)}</pre>
		</section>
	)
}