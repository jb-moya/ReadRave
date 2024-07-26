"use client";

import { signOut } from "next-auth/react";
import { useState, useRef, ChangeEvent, useCallback, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/Book/BookCard";
import { merriweather } from "@/fonts";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import Navbar from "../components/Navbar";
import { Book, Quote } from "@/interfaces";
import debounce from "../util/debounce";
import SearchInput from "../components/Input/SearchInput";

const Home = () => {
    const hasQuoteFetched = useRef(false);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("The song of ice and fire");
    const [books, setBooks] = useState<Book[]>([]);
    const [quote, setQuote] = useState<Quote>({ a: "", q: "" });

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

    return (
        <>
            <div className="min-h-screen w-full">
                <Navbar />

                <div
                    className={`${merriweather.className} my-5 w-fit mx-auto px-2 py-1 relative min-h-24`}
                >
                    {quote && quote.q && (
                        <div className="flex flex-col w-fit mx-auto items-center">
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
                    <p className={`font-thin w-fit mx-auto mt-2 italic`}>
                        {quote && quote.q ? `- ${quote.a} -` : null}
                    </p>
                </div>

                <SearchInput
                    setBooks={setBooks}
                    query={query}
                    setQuery={setQuery}
                    loading={searchLoading}
                    setLoading={setSearchLoading}
                />

                <div className="mt-14 w-full">
                    {books.map((book) => {
                        const imageSrc =
                            book.volumeInfo.imageLinks?.thumbnail ||
                            book.volumeInfo.imageLinks?.smallThumbnail;

                        return (
                            <BookCard
                                key={book.id}
                                id={book.id}
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

export default Home;
