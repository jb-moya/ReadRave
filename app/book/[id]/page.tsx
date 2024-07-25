"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BookImageContainer from "@/app/components/Book/BookImageContainer";
import Navbar from "@/app/components/Navbar";
import { Book } from "@/interfaces";
import { merriweather } from "@/app/styles/fonts";
import clsx from "clsx";
import BookStarRating from "@/app/components/Book/BookStarRating";
import BookAuthors from "@/app/components/Book/BookAuthors";
import Button from "@/app/components/Button";
import { BiChevronDown } from "react-icons/bi";

const fetchBookInfo = async (bookId: string) => {
    try {
        const response = await axios.get(`/api/book?bookId=${bookId}`);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const BookDetail = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;

    return (
        <>
            <div className="text-sm w-32 col-span-3 sm:col-span-2">{label}</div>
            <div className="col-span-9 sm:col-span-10">{value}</div>
        </>
    );
};

export default function Page({
    params: { id: id },
}: {
    params: { id: string };
}) {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [showDescriptionMore, setShowDescriptionMore] = useState(false);

    useEffect(() => {
        const getBookInfo = async () => {
            const data = await fetchBookInfo(id);
            setBook(data);
            setLoading(false);
        };

        getBookInfo();
    }, [id]);

    useEffect(() => {
        if (!book) return;

        const categories: string[] = [];
        const genres: string[] = [];

        const char = "/";

        // Split categories by char
        (book?.volumeInfo.categories || []).forEach((category) => {
            const index = category.indexOf(char);

            if (index !== -1) {
                categories.push(category.slice(0, index));
            } else {
                categories.push(category);
            }
        });

        // Split genres by char
        (book?.volumeInfo.categories || []).forEach((genre) => {
            const index = genre.indexOf(char);

            if (index !== -1) {
                genres.push(genre.substring(index + 1).trim());
            } else {
                genres.push(genre);
            }
        });

        // console the two
        // console.log("Categories:", categories);
        // console.log("Genres:", genres);

        setCategories(categories);
        setGenres(genres);
    }, [book]);

    return (
        <div className="min-h-[500px] w-full px-5">
            <Navbar />
            <div className="mt-10">
                <BookImageContainer
                    title={book?.volumeInfo.title || ""}
                    image={
                        book?.volumeInfo.imageLinks?.extraLarge ??
                        book?.volumeInfo.imageLinks?.large ??
                        book?.volumeInfo.imageLinks?.medium ??
                        book?.volumeInfo.imageLinks?.small ??
                        book?.volumeInfo.imageLinks?.thumbnail ??
                        book?.volumeInfo.imageLinks?.smallThumbnail ??
                        ""
                    }
                    imageContainerClassName="mx-auto max-w-[300px] min-w-[300px] min-h-[450px] sm:min-w-[300px] sm:min-h-[450px]"
                />
            </div>
            <div className="mt-10 text-center">
                <p
                    className={clsx(
                        "text-3xl font-bold text-custom-static-2",
                        merriweather.className
                    )}
                >
                    {book?.volumeInfo.title}
                </p>
                <p className="text-2xl font-light text-custom-color-5/50">
                    {book?.volumeInfo.subtitle}
                </p>
            </div>
            <div className="text-2xl my-2 w-full justify-center flex">
                <BookAuthors authors={book?.volumeInfo.authors || []} />
            </div>
            <div className="mt-5 sm:flex block items-center">
                <div className="flex items-center">
                    <BookStarRating />
                    <div className="text-3xl mx-2">4.38</div>
                </div>
                <div className="flex opacity-75 flex-grow">
                    <div>323,001 ratings</div>
                    <div className="mx-2 opacity-50">•</div>
                    <div>24,222 reviews</div>
                </div>
                <div>
                    {book?.volumeInfo.publishedDate && (
                        <div className="opacity-75">
                            published{" "}
                            {new Date(
                                book?.volumeInfo.publishedDate
                            ).getFullYear()}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-5 w-full min-h-28">
                {book?.volumeInfo.description && (
                    <>
                        <div className="relative">
                            {!showDescriptionMore && (
                                <div className="absolute inset-0 bg-gradient-to-t from-custom-color-1 via-custom-color-1/50 to-custom-color-1/5 z-10"></div>
                            )}

                            <div
                                className={clsx(`relative`, {
                                    "line-clamp-[10]": !showDescriptionMore,
                                })}
                                dangerouslySetInnerHTML={{
                                    __html: book?.volumeInfo.description || "",
                                }}
                            ></div>
                        </div>
                        <Button
                            className="mt-2 mx-auto"
                            secondary
                            onClick={() =>
                                setShowDescriptionMore(!showDescriptionMore)
                            }
                        >
                            Read more <BiChevronDown />{" "}
                        </Button>
                    </>
                )}
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-12 gap-0 mt-4">
                {categories && categories.length > 0 && (
                    <>
                        <div className="text-sm w-32 col-span-3 sm:col-span-2">
                            Categories
                        </div>
                        <div className="flex flex-wrap col-span-9 sm:col-span-10">
                            {categories.map((category, index) => (
                                <div key={category}>
                                    <div
                                        key={category}
                                        className="text-custom-color-5/50 text-nowrap"
                                    >
                                        {category}
                                        <span className="opacity-35 mr-1">
                                            {index < categories.length - 1 &&
                                                " • "}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {genres && genres.length > 0 && (
                    <>
                        <div className="text-sm w-32 col-span-3 sm:col-span-2">
                            Genres
                        </div>
                        <div className="flex flex-wrap col-span-9 sm:col-span-10">
                            {genres.map((genre, index) => (
                                <div key={genre}>
                                    <div
                                        key={genre}
                                        className="text-custom-color-5/50 text-nowrap"
                                    >
                                        {genre}
                                        <span className="opacity-35 mr-1">
                                            {index < genres.length - 1 && " • "}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <BookDetail
                    label="Publisher"
                    value={book?.volumeInfo.publisher || ""}
                />
                <BookDetail
                    label="Page Count"
                    value={book?.volumeInfo.pageCount?.toString() || ""}
                />
                <BookDetail
                    label="ISBN"
                    value={
                        book?.volumeInfo.industryIdentifiers?.[0]?.identifier ||
                        ""
                    }
                />
                <BookDetail
                    label="Language"
                    value={book?.volumeInfo.language || ""}
                />
            </div>
        </div>
    );
}
