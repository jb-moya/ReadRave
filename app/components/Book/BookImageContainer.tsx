"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";

const BookImageContainer = ({
    title,
    image,
    imageContainerClassName,
}: {
    title: string;
    image: string;
    imageContainerClassName?: string;
}) => {
    return (
        <div
            className={clsx(
                `flex items-start max-w-[120px] min-w-[120px] min-h-[180px] sm:min-w-[120px] sm:min-h-[180px] relative group hover:scale-105 transition-transform duration-500 ease-elegant cursor-pointer`,
                imageContainerClassName
            )}
        >
            {image ? (
                <Image
                    src={image || ""}
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
    );
};

export default BookImageContainer;
