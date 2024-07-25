export interface Quote {
    q: string;
    a: string;
}

export interface Book {
    id: string;
    volumeInfo: {
        title: string;
        subtitle?: string;
        authors?: string[];
        categories?: string[];
        publishedDate?: string;
        publisher?: string;
        description?: string;
        pageCount?: number;
        imageLinks?: {
            extraLarge?: string;
            large?: string;
            medium?: string;
            small?: string;
            thumbnail?: string;
            smallThumbnail?: string;
        };
        language?: string;
        industryIdentifiers?: {
            type: "ISBN_10" | "ISBN_13";
            identifier: string;
        }[];
    };
}
