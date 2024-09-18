import { NextResponse } from "next/server";
import { generateMockData } from "@/scripts/generateMockData";

export async function GET(request: Request) {
  try {
    await generateMockData();
    return NextResponse.json(
      { message: "Mock data generated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating mock data:", error);
    return NextResponse.json(
      { error: "Failed to generate mock data" },
      { status: 500 }
    );
  }
}
