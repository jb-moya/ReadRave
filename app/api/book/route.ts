// pages/api/books.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const query = url.searchParams.get("query");
        const bookId = url.searchParams.get("bookId");

        console.log("URL", url);

        if (!query && !bookId) {
            return new NextResponse(
                "Query parameter or bookId parameter is required",
                {
                    status: 400,
                }
            );
        }

        let response;

        if (query) {
            response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes`,
                {
                    params: {
                        q: query,
                        key: process.env.GOOGLE_BOOKS_API_KEY,
                    },
                }
            );
        } else if (bookId) {
            response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes/${bookId}`,
                {
                    params: {
                        key: process.env.GOOGLE_BOOKS_API_KEY,
                    },
                }
            );
        }

        if (response) {
            return NextResponse.json(response.data);
        } else {
            return new NextResponse(
                "Failed to fetch data from Google Books API",
                {
                    status: 500,
                }
            );
        }
    } catch (error) {
        console.error(error, "GOOGLE_BOOKS_API_ERROR");
        return new NextResponse("Failed to fetch data from Google Books API", {
            status: 500,
        });
    }
}
