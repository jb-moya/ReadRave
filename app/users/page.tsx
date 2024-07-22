"use client";

import { signOut } from "next-auth/react";
import { useState, useRef, ChangeEvent, useCallback, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/Book/BookCard";
import { CiSearch } from "react-icons/ci";
import { merriweather } from "@/fonts";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
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

interface Quote {
    q: string;
    a: string;
}

const Users = () => {
    const hasQuoteFetched = useRef(false);
    const [query, setQuery] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [quote, setQuote] = useState<Quote>({ a: "", q: "" });

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

    const getQuote = useCallback(async () => {
        const response = await axios.get("/api/zenquotes");
        console.log("response", response);
        setQuote(response.data[0]);
    }, []);

    useEffect(() => {
        if (!hasQuoteFetched.current) {
            getQuote();
            hasQuoteFetched.current = true;
        }
    }, [getQuote]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <>
            <div className="min-h-screen">
                <div
                    className={`${merriweather.className} my-5 w-fit mx-auto px-2 py-1 relative min-h-24`}
                >
                    {quote && quote.q && (
                        <div className="flex flex-col w-fit mx-auto items-center text-custom-color-5">
                            <RiDoubleQuotesL
                                className="absolute left-0 bottom-[50%] transform translate-y-1/2 text-custom-static-2 opacity-25"
                                size={150}
                            />
                            <p className="text-lg italic text-center">
                                {quote.q}
                            </p>
                            <RiDoubleQuotesR
                                className="absolute right-0 bottom-[50%] transform translate-y-1/2 text-custom-static-2 opacity-25"
                                size={150}
                            />
                        </div>
                    )}
                    <p
                        className={`font-thin w-fit mx-auto mt-2 italic text-custom-color-5`}
                    >
                        {quote && quote.q ? `- ${quote.a} -` : null}
                    </p>
                </div>

                <div className="mb-14 z-40 flex w-full text-custom-static-2 border-b-2 border-custom-color-2">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search for books"
                        className="w-full p-2 placeholder:text-custom-color-5/50 bg-transparent"
                    />

                    <button
                        className="w-14 text-center flex items-center justify-center"
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading ? "..." : <CiSearch size={24} />}
                    </button>
                </div>

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


                    {/* example booCard */}
                    <BookCard
                        title="The Lord of the Rings"
                        subtitle="The Fellowship of the Ring"
                        authors={["J.R.R. Tolkien"]}
                        categories={["Fantasy"]}
                        publishedDate="1954"
                        pageCount={700}
                        image="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    />
                </div>
            </div>
        </>
    );
};

export default Users;
