"use server";
import { sql } from "@vercel/postgres";
import { getManagementApiToken } from "./auth";

export async function getUserData(nullifierHash: string) {
  const dbUser =
    await sql`SELECT * FROM Users WHERE nullifier_hash = ${nullifierHash}`;
  if (dbUser.rowCount === 0) return null;
  return {
    username: dbUser.rows[0].username,
    nullifierHash: dbUser.rows[0].nullifier_hash,
    bio: dbUser.rows[0].bio,
  };
}

export async function getReducedUserData(username: string) {
  const dbUser = await sql`SELECT * FROM Users WHERE username = ${username}`;
  return {
    username: dbUser.rows[0].username,
  };
}

export async function getUsers(): Promise<any> {
  const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL as string;

  const response = await fetch(`${AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API}`,
    },
  });
  const users = await response.json();
  return users;
}

export async function getUserFromSub(sub: string) {
  const managementApiToken = await getManagementApiToken();
  const response = await fetch("https://id.worldcoin.org/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${managementApiToken}`,
    },
  });
  console.log("data", response.body);
}

export async function updateUser(username: string, bio?: string) {
  console.log("username", username);
  console.log("bio", bio);
  const dbUser =
    await sql`UPDATE Users SET bio = ${bio} WHERE username = ${username}`;
  if (dbUser.rowCount === 0) return null;
  return {
    username: username,
    bio: bio,
  };
}
