"use client";
import Image from "next/image";
import { merriweather } from "@/fonts";
import { BsStarFill } from "react-icons/bs";
import formatNumber from "@/app/util/numFormat";
import BookStatusButton from "./BookStatusButton";

interface BookCardProps {
    title: string;
    subtitle?: string;
    authors?: string[];
    categories?: string[];
    publishedDate?: string;
    pageCount?: number;
    image?: string;
}

export default function BookCard({
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
        <div className="group w-full flex gap-1 mt-4 text-custom-color-5">
            <div className="flex border-b border-custom-color-5/10 items-start max-w-[120px] min-w-[120px] min-h-[180px] sm:min-w-[120px] sm:min-h-[180px] relative group hover:scale-105 transition-transform duration-500 ease-elegant cursor-pointer">
                {image ? (
                    <Image
                        src={image}
                        alt="book"
                        className="object-contain object-top  w-full shadow-2xl "
                        width="0"
                        height="0"
                        sizes="100vw"
                    />
                ) : (
                    <div className="truncate relative w-full h-full flex flex-col items-center justify-center border border-custom-color-4">
                        <p className="text-xs mt-2 absolute top-0 opacity-75">
                            no image
                        </p>
                        <p className="truncate text-wrap overflow-hidden">
                            {title}
                        </p>
                    </div>
                )}
            </div>
            <div className="mx-2 mt-2 w-full flex flex-col">
                <div
                    className={`${merriweather.className} border-b-[1px] border-custom-color-5 border-opacity-10 cursor-pointer line-clamp-2`}
                >
                    <div className="group-hover:text-custom-static-2 text-xl">
                        <span>{title}</span>
                        {subtitle && (
                            <>
                                <span className="font-thin ml-1">
                                    • {subtitle}
                                </span>
                            </>
                        )}
                    </div>
                    <div className="text-sm line-clamp-1 mt-1 text-custom-static-2">
                        <span className="text-custom-color-5">by </span>
                        {authors?.map((author, index) => (
                            <div key={author}>
                                <span>{author}</span>
                                <span>
                                    {index < authors.length - 1 && " • "}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex text-sm mt-1 line-clamp-1">
                    {categories?.map((category) => (
                        <span key={category} className=" opacity-80">
                            {category}
                        </span>
                    ))}
                    {publishedDate && (
                        <>
                            <span className="opacity-35 mx-1"> • </span>
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

                <div className="flex h-auto flex-row text-center items-end justify-end flex-1">
                    <BookStatusButton />
                </div>
            </div>
        </div>
    );
}
