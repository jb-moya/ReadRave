"use client";
import Image from "next/image";
import { merriweather } from "@/fonts";
import { BsStarFill } from "react-icons/bs";
import formatNumber from "@/app/util/numFormat";
import BookStatusButton from "./BookStatusButton";
import BookImageContainer from "./BookImageContainer";
import Link from "next/link";
import BookAuthors from "./BookAuthors";

interface BookCardProps {
    id?: string;
    title: string;
    subtitle?: string;
    authors?: string[];
    categories?: string[];
    publishedDate?: string;
    pageCount?: number;
    image?: string;
}

export default function BookCard({
    id,
    title,
    subtitle,
    authors,
    categories,
    publishedDate,
    pageCount,
    image,
}: BookCardProps) {
    const randomStarRating = 3 + Math.random() * 2;
    const randomRatingCount = Math.floor(Math.random() * 20_000);

    return (
        <div className="group w-full flex gap-1 mt-4 border-b border-custom-color-5/10 px-4">
            <BookImageContainer
                title={title}
                image={image || ""}
                imageContainerClassName="w-[120px] h-[180px] sm:w-[120px] sm:h-[180px]"
            />

            <div className="min-h-[200px] mx-2 mt-2 w-full flex flex-col">
                <div
                    className={`${merriweather.className} w-full cursor-pointer line-clamp-3`}
                >
                    <Link
                        href={`/book/${id}`}
                        className="group-hover:text-custom-static-2 text-xl"
                    >
                        <span>{title}</span>
                        {subtitle && (
                            <>
                                <span className="font-thin ml-1">
                                    • {subtitle}
                                </span>
                            </>
                        )}
                    </Link>
                </div>

                {/* <span>{authors}</span> */}
                <div className="text-sm flex justify-start mt-1 w-full">
                    <BookAuthors authors={authors || []} />
                </div>

                <div className="flex text-sm mt-1 line-clamp-1">
                    {categories?.map((category, index) => (
                        <>
                            <span key={category} className=" opacity-80">
                                {category}
                            </span>
                            <span className="opacity-35 mr-1">
                                {index < categories.length - 1 && " • "}
                            </span>
                        </>
                    ))}
                    
                    {publishedDate && (
                        <>
                            <span className=" opacity-80">
                                {new Date(publishedDate).getFullYear()}
                            </span>
                        </>
                    )}
                </div>

                <div className="flex text-sm items-center gap-1">
                    <BsStarFill className="text-custom-static-2" />
                    {randomStarRating.toFixed(2)}
                    <span className=" opacity-80">
                        ({formatNumber(randomRatingCount)})
                    </span>

                    {pageCount && (
                        <>
                            <span className="opacity-35">•</span>
                            <span className=" opacity-80">
                                {formatNumber(pageCount)} pages
                            </span>
                        </>
                    )}

                    <div>
                        <span className="opacity-35">•</span> 144 readers
                    </div>
                </div>

                <div className="flex h-auto flex-row text-center items-end justify-end flex-1 mb-2">
                    <BookStatusButton />
                </div>
            </div>
        </div>
    );
}
