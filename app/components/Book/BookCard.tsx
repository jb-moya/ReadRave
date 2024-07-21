"use client";
import Image from "next/image";
import { merriweather } from "@/fonts";
import { BsStarFill } from "react-icons/bs";
import formatNumber from "@/app/util/numFormat";

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
        <div className="group w-full flex gap-1 mt-2">
            <div className="m-2 bg-custom-color-4 min-w-[120px] min-h-[180px] sm:min-w-[150px] sm:min-h-[225px] relative shadow-2xl group hover:scale-105 transition-transform duration-500 ease-elegant cursor-pointer">
                {image ? (
                    <Image
                        src={image}
                        alt="book"
                        className="object-contain w-full h-full"
                        width="0"
                        height="0"
                        sizes="100vw"
                    />
                ) : (
                    <div className="w-full h-full  flex items-center justify-center text-custom-color-5">
                        {title}
                    </div>
                )}
            </div>
            <div className="m-2 w-full ">
                <div
                    className={`${merriweather.className} border-b-[1px] border-custom-color-5 border-opacity-15 cursor-pointer line-clamp-2 text-lg `}
                >
                    <div className="group-hover:text-custom-color-2">
                        <span>{title}</span>
                        {subtitle && (
                            <>
                                <span className="font-thin ml-1">
                                    • {subtitle}
                                </span>
                            </>
                        )}
                    </div>
                    <div className="text-sm line-clamp-1 mt-1">
                        {authors?.map((author, index) => (
                            <span
                                key={author}
                                className="text-custom-color-5 text-opacity-50"
                            >
                                by {author}
                                {index < authors.length - 1 && " • "}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="text-sm mt-1 line-clamp-1">
                    {categories?.map((category) => (
                        <span
                            key={category}
                            className="text-custom-color-5 text-opacity-50"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                <div className="flex text-sm items-center gap-1">
                    <BsStarFill className="text-custom-color-2" />
                    {randomStarRating.toFixed(2)}
                    <span className="text-custom-color-5 text-opacity-50">
                        ({formatNumber(randomRatingCount)})
                    </span>
                    {publishedDate && (
                        <>
                            <span className="opacity-35">•</span>
                            <span className="text-custom-color-5 text-opacity-50">
                                {new Date(publishedDate).getFullYear()}
                            </span>
                        </>
                    )}
                    {pageCount && (
                        <>
                            <span className="opacity-35">•</span>
                            <span className="text-custom-color-5 text-opacity-50">
                                {formatNumber(pageCount)} pages
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
