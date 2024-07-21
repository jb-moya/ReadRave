"use client";

import { signOut } from "next-auth/react";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import BookCard from "../components/Book/BookCard";

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        publishedDate?: string;
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
                <div className="flex flex-wrap justify-center gap-7">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.volumeInfo.title}
                            authors={book.volumeInfo.authors}
                        />
                    ))}

                    {/*  mote: error: GH013: Repository rule violations found for refs/heads/main.        
remote: 
remote: - GITHUB PUSH PROTECTION        
remote:   —————————————————————————————————————————        
remote:     Resolve the following violations before pushing again        
remote: 
remote:     - Push cannot contain secrets        
remote: */}

                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                    <BookCard
                        key={"fasdf"}
                        title={"Maybe you should read this"}
                        authors={["JB Moya"]}
                    />
                </div>
            </div>
        </>
    );
};

export default Users;
