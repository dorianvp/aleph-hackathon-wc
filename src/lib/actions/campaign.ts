"use server";
import { sql } from "@vercel/postgres";

enum Currencies {
  USDC = "USDC",
  ETH = "ETH",
}

export type Campaign = {
  id?: string;
  userId: string;
  name: string;
  description: string;
  currency: Currencies;
  goal: number;
  isPublic: boolean;
  images: string[];
  anonymous: boolean; // Changed from creatorVisibility
  paymentAddress: string;
};

export type CampaignWithCreator = Campaign & {
  creatorName: string;
};

export async function createCampaign(campaign: {
  name: string;
  description: string;
  currency: string;
  donationTiers: { name: string; amount: string }[];
  isPublic: boolean;
  images: string[];
  anonymous: boolean; // Changed from creatorVisibility
  goal: number | null;
  userId: string;
  optimismAddress: string;
}) {
  console.log("Creating campaign:", campaign);
  try {
    const result = await sql`
      INSERT INTO Campaigns (
        name, description, public, anonymous, goal, "userId", "paymentAddress"
      ) 
      VALUES (
        ${campaign.name}, ${campaign.description}, ${campaign.isPublic}, 
        ${campaign.anonymous}, ${campaign.goal}, ${campaign.userId}, ${campaign.optimismAddress}
      )
      RETURNING id
    `;

    return result.rows[0].id;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
}

export async function getCampaigns(): Promise<Campaign[]> {
  const result = await sql`SELECT * FROM Campaigns`;
  return result.rows as Campaign[];
}

export async function getCampaign(
  id: string
): Promise<CampaignWithCreator | null> {
  const result = await sql`SELECT * FROM Campaigns WHERE id = ${id}`;
  if (result.rows.length === 0) {
    return null;
  }

  const campaign = result.rows[0] as Campaign;
  const creator =
    await sql`SELECT username FROM Users WHERE "nullifier_hash" = ${campaign.userId}`;
  return { ...campaign, creatorName: creator.rows[0].username };
}
