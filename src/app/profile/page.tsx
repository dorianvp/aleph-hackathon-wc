
import { getUserData } from "@/lib/actions/user";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Profile() {
	const session = await getSession();
	console.log("session", session);

	const userData = await getUserData(session?.user?.sub as string);

	return (
		<section>
			<h1>Profile</h1>
			<pre>{JSON.stringify(userData, null, 2)}</pre>
		</section>
	)
}