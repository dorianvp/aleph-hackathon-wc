import { MiniKit } from "@worldcoin/minikit-js";
import NextAuth, { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,

	providers: [
		{
			id: "worldcoin",
			name: "Worldcoin",
			type: "oauth",
			wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
			authorization: { params: { scope: "openid" } },
			clientId: process.env.WORLDCOIN_CLIENT_ID,
			clientSecret: process.env.WORLDCOIN_SECRET,
			idToken: true,
			checks: [
				"state",
				"nonce",
				"pkce"
			],
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.sub,
					verificationLevel:
						profile["https://id.worldcoin.org/v1"].verification_level,
				};
			},
		},
	],
	callbacks: {
		async signIn({ user }) {
			console.log("USER", user);

			return true;
		},
	},
	debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };