"use client";
import Image from "next/image";

interface BookCardProps {
    title: string;
    authors?: string[];
}

export default function BookCard({ title, authors }: BookCardProps) {
    return (
        <div className="w-[150px] flex flex-col gap-1">
            <Image
                src="/book.png"
                alt="book"
                className="w-full h-[220px] bg-custom-color-2 mb-2 shadow-md"
                width={100}
                height={100}
            />
            <h2 className="font-semibold line-clamp-2 leading-tight">{title}</h2>
            <p className="text-sm line-clamp-1">{authors?.join(", ")}</p>
        </div>
    );
}
