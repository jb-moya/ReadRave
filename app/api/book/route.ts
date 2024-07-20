// pages/api/books.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import axios from "axios";

interface GoogleBooksResponse {
    items: Array<{
        id: string;
        volumeInfo: {
            title: string;
            authors?: string[];
            publishedDate?: string;
        };
    }>;
}

export async function GET(request: Request) {
    try {
        // Extract the query parameter from the URL
        const url = new URL(request.url);
        const query = url.searchParams.get("query");

        if (!query) {
            return new NextResponse("Query parameter is required", {
                status: 400,
            });
        }

        // Fetch data from Google Books API
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes`,
            {
                params: {
                    q: query,
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error, "GOOGLE_BOOKS_API_ERROR");
        return new NextResponse("Failed to fetch data from Google Books API", {
            status: 500,
        });
    }
}

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const { query } = req.query;
//     console.log("HTTP Method:", req.method);

//     if (!query || typeof query !== "string") {
//         return res.status(400).json({ error: "Query parameter is required" });
//     }

//     try {
      
//         const response = await axios.get(
//             `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
//         );

//         console.log("apikey", process.env.GOOGLE_BOOKS_API_KEY);

//         console.log(response.data);
//         res.status(200).json(response.data);
//     } catch (error) {
//         res.status(500).json({
//             error: "Failed to fetch data from Google Books API",
//         });
//     }
// }

  // const response = await axios.get<GoogleBooksResponse>(
        //     `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
        // );
