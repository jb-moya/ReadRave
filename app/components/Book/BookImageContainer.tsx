"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { toBase64, shimmer } from "@/app/util/shimmer";

const BookImageContainer = ({
    title,
    image,
    imageContainerClassName,
    loading = false,
}: {
    title: string;
    image: string;
    imageContainerClassName?: string;
    loading?: boolean;
}) => {
    return (
        <div
            className={clsx(
                `flex items-start max-w-[120px] min-w-[120px] sm:min-w-[120px] relative group transition-transform duration-500 ease-elegant`,
                imageContainerClassName
            )}
        >
            {image && !loading ? (
                <Image
                    src={image || ""}
                    alt="book"
                    className="object-contain object-top w-full"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(10, 10)
                    )}`}
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
    );
};

export default BookImageContainer;
