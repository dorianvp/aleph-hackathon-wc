import { sql } from "@vercel/postgres";
import { faker } from "@faker-js/faker";

export async function generateMockData() {
  try {
    // Generate mock users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const username = faker.internet.userName();
      const nullifierHash = faker.string.hexadecimal({
        length: 64,
        prefix: "0x",
      });
      const bio = faker.lorem.paragraph();

      const result = await sql`
        INSERT INTO Users (nullifier_hash, username, bio) 
        VALUES (${nullifierHash}, ${username}, ${bio})
        RETURNING nullifier_hash`;

      users.push(result.rows[0].nullifier_hash);
    }

    console.log("Mock users generated successfully");

    // Generate mock campaigns
    for (let i = 0; i < 20; i++) {
      const name = faker.lorem.sentence();
      const description = faker.lorem.paragraph();
      const goal = faker.number.int({ min: 1000, max: 100000 });
      const userId = faker.helpers.arrayElement(users); // Select a random user ID

      await sql`
        INSERT INTO Campaigns (name, description, goal, public, "userId") 
        VALUES (${name}, ${description}, ${goal}, ${true}, ${userId})`;
    }

    console.log("Mock campaigns generated successfully");
  } catch (error) {
    console.error("Error generating mock data:", error);
    throw error; // Re-throw the error so it can be caught by the API route
  }
}
