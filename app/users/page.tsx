"use client";

import { signOut } from "next-auth/react";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import BookCard from "../components/Book/BookCard";

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        subtitle?: string;
        authors?: string[];
        categories?: string[];
        publishedDate?: string;
        pageCount?: number;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
    };
}

const Users = () => {
    const [query, setQuery] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`/api/book?query=${query}`);
            console.log(response);
            setBooks(response.data.items);
        } catch (err) {
            setError("Failed to fetch books");
        }
        setLoading(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <>
            <button onClick={() => signOut()}>Sign out</button>
            <div>
                <h1>ReadRave</h1>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for books"
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="w-full">
                    {books.map((book) => {
                        const imageSrc =
                            book.volumeInfo.imageLinks?.thumbnail ||
                            book.volumeInfo.imageLinks?.smallThumbnail;

                        return (
                            <BookCard
                                key={book.id}
                                title={book.volumeInfo.title}
                                subtitle={book.volumeInfo.subtitle}
                                authors={book.volumeInfo.authors}
                                categories={book.volumeInfo.categories}
                                publishedDate={book.volumeInfo.publishedDate}
                                pageCount={book.volumeInfo.pageCount}
                                image={imageSrc || ""}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Users;
