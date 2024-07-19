"use client";
import React from "react";
import { setTheme } from "@/lib/features/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RootState } from "../../lib/store";

const ToggleTheme = () => {
    const { theme } = useSelector((state: RootState) => state.theme);

    const dispatch = useDispatch();

    const toggleTheme = () => {
        dispatch(setTheme(theme === "light" ? "dark" : "light"));
    };
    return (
        <button
            onClick={toggleTheme}
            className="text-2xl text-custom-color-5 p-1 m-1"
        >
            {theme === "dark" ? <MdDarkMode /> : <MdOutlineLightMode />}
        </button>
    );
};

export default ToggleTheme;
