import React from "react";

export default function BookAuthors({ authors }: { authors: string[] }) {
    return (
        <>
            <span className="mr-1">by </span>
            {authors?.map((author, index) => (
                <div key={author}>
                    <span className="text-custom-static-2">{author}</span>
                    <span className="opacity-35 mr-1">
                        {index < authors.length - 1 && " • "}
                    </span>
                </div>
            ))}
        </>
    );
}
