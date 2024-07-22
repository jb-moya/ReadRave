import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error, "ZEN_QUOTES_API_ERROR");
        return new NextResponse("Failed to fetch data from Zen Quotes API", {
            status: 500,
        });
    }
}
