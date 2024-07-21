"use client";

import { signOut } from "next-auth/react";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import BookCard from "../components/Book/BookCard";
import { CiSearch } from "react-icons/ci";
import ToggleTheme from "../components/ToggleTheme";
import { merriweather } from "@/fonts";


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
            <div>
                <div className="p-2 h-fit flex justify-between items-center align-middle content-center text-custom-color-5">
                    <h1 className="text-5xl">
                        <span className={"font-thin text-custom-static-1"}>
                            read
                        </span>
                        <span
                            className={`${merriweather.className} font-thin text-custom-static-2`}
                        >
                            rave
                        </span>
                    </h1>
                    {/* <button onClick={() => signOut()}>Sign out</button> */}
                    <div className="flex items-center text-custom-static-2">
                        <ToggleTheme />
                        <div className="rounded-full border border-custom-color-1 bg-custom-static-3 w-8 h-8"></div>
                    </div>
                </div>

                <div className="p-2 flex w-full my-16 text-custom-static-2">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search for books"
                        className="w-full bg-custom-color-1 border border-custom-color-5/40 p-2 placeholder:text-custom-color-5/50"
                    />

                    <button
                        className="w-14 bg-custom-color-1 border border-custom-color-5/40 text-center flex items-center justify-center"
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
                </div>
            </div>
        </>
    );
};

export default Users;
