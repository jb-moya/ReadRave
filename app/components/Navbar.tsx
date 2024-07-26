"use client";
import React, { useEffect, useState } from "react";
import { merriweather } from "@/fonts";
import ToggleTheme from "./ToggleTheme";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import SearchInput from "./Input/SearchInput";
import { Book } from "@/interfaces";
import { usePathname } from "next/navigation";
import BookStatusButton from "./Book/BookStatusButton";
import Link from "next/link";
import BookImageContainer from "./Book/BookImageContainer";

const Navbar = () => {
    const pathname = usePathname();
    const resultContainerRef = React.useRef<HTMLDivElement>(null);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("The song of ice and fire");
    const [books, setBooks] = useState<Book[]>([]);
    const [isSearchInputFocused, setIsSearchInputFocused] =
        useState<boolean>(false);

    

    useEffect(() => {
        console.log("query", query);
    }, [query]);

    return (
        <nav className="relative p-2 h-fit flex justify-between items-center align-middle content-center text-custom-color-5">
            <h1 className="text-xl sm:text-5xl flex-grow">
                <span className={"font-thin text-custom-static-1"}>read</span>
                <span
                    className={`${merriweather.className} font-thin text-custom-static-2`}
                >
                    rave
                </span>
            </h1>

            {pathname !== "/home" && (
                <div className="sm:relative w-5/12">
                    <SearchInput
                        setBooks={setBooks}
                        query={query}
                        setQuery={setQuery}
                        setIsFocused={setIsSearchInputFocused}
                        loading={searchLoading}
                        setLoading={setSearchLoading}
                        maxResults={5}
                        resultContainerRef={resultContainerRef}
                    />

                    {query && isSearchInputFocused && (
                        <div
                            ref={resultContainerRef}
                            className="absolute bg-custom-color-1 brightness-110 text-custom-color-5 z-10 min-h-10 left-0 w-full top-11 shadow-xl border-b border-custom-static-2"
                        >
                            {searchLoading && (
                                <span className="loading loading-spinner loading-lg min-h-20 mx-auto"></span>
                            )}

                            {books.map((book) => (
                                <Link
                                    key={book.id}
                                    href={`/book/${book.id}`}
                                    className="flex p-2 hover:brightness-105 hover:bg-custom-static-2/10"
                                    onClick={() => {
                                        console.log("tt");
                                    }}
                                    onMouseEnter={() => {
                                        console.log("teeeeeeet");
                                    }}
                                >
                                    <div className="w-14 h-16">
                                        <BookImageContainer
                                            title={book.volumeInfo.title || ""}
                                            image={
                                                book.volumeInfo.imageLinks
                                                    ?.smallThumbnail || ""
                                            }
                                            imageContainerClassName="max-w-full min-w-full sm:min-w-full h-full"
                                        />
                                    </div>
                                    <div className="p-1 w-full">
                                        {book.volumeInfo.title}
                                        {book.volumeInfo.authors && (
                                            <div>
                                                {book.volumeInfo.authors[0]}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}

                            {!searchLoading && books.length === 0 && (
                                <div className="text-center">
                                    No books found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center text-custom-static-2">
                <ToggleTheme />

                <div className="dropdown dropdown-hover dropdown-end h-8 w-8">
                    <div
                        tabIndex={0}
                        role="button"
                        className="avatar btn min-h-0 w-full h-full rounded-full"
                    >
                        <Image
                            src={
                                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                            fill
                            sizes="10vw"
                            className="rounded-full w-full"
                            alt="avatar"
                        />
                    </div>

                    <ul tabIndex={0} className="dropdown-content top-8 menu">
                        <li>
                            <a onClick={() => signOut({ callbackUrl: "/" })}>
                                <LuLogOut size={20} /> Logout
                            </a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
