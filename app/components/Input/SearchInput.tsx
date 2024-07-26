"use client";
import {
    useState,
    useEffect,
    useCallback,
    ChangeEvent,
    FocusEvent,
} from "react";

import { CiSearch } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import clsx from "clsx";

const SearchInput = ({
    setBooks,
    query,
    setQuery,
    containerClassName,
    setIsFocused = () => {},
    loading = false,
    setLoading = () => {},
    maxResults = null,
    resultContainerRef = null,
}: {
    setBooks: Function;
    query: string;
    setQuery: Function;
    containerClassName?: string;
    setIsFocused?: Function;
    loading?: boolean;
    setLoading?: Function;
    maxResults?: number | null;
    resultContainerRef?: any;
}) => {
    const [debounceQuery] = useDebounce(query, 1000);

    const handleSearch = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axios.get(
                `/api/book?query=${debounceQuery}`,
                {
                    params: {
                        maxResults: maxResults || null,
                    },
                }
            );
            console.log(response);
            setBooks(response.data.items);
        } catch (err) {
            toast.error("Failed to fetch books");
        }
        setLoading(false);
    }, [debounceQuery, loading, setBooks, setLoading, maxResults]);

    useEffect(() => {
        if (debounceQuery) {
            handleSearch();
        }
    }, [debounceQuery]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        console.log("Input is focused");
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        // if clicking on the result, don't blur
        if (resultContainerRef?.current?.contains(e.relatedTarget)) {
            return;
        }

        setIsFocused(false);
        console.log("Input is blurred");
    };

    useEffect(() => {
        console.log("reloard");
    }, []);

    useEffect(() => {
        if (loading) {
            setBooks([]);
        }
    }, [loading]);

    return (
        <>
            <div
                className={clsx(
                    "relative z-40 flex w-full text-custom-static-2 border-b-2 border-custom-color-2",
                    containerClassName
                )}
            >
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for books"
                    className="w-full p-2 bg-transparent"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            // 
                        }
                    }}
                />

                <button
                    className="absolute right-0 h-full hover:brightness-125 hover:scale-110 w-14 text-center flex items-center justify-center"
                    // onClick={}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        <CiSearch size={24} />
                    )}
                </button>
            </div>
        </>
    );
};

export default SearchInput;
