"use client";
import React from "react";
import { merriweather } from "@/fonts";
import ToggleTheme from "./ToggleTheme";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "next-auth/react";

const Navbar = () => {
    return (
        <nav className="p-2 h-fit flex justify-between items-center align-middle content-center text-custom-color-5">
            <h1 className="text-5xl">
                <span className={"font-thin text-custom-static-1"}>read</span>
                <span
                    className={`${merriweather.className} font-thin text-custom-static-2`}
                >
                    rave
                </span>
            </h1>
            {/* <button >Sign out</button> */}
            <div className="flex items-center text-custom-static-2">
                <ToggleTheme />
                <div className="dropdown dropdown-hover dropdown-end h-8 p-0  w-8">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn min-h-0 w-full h-full"
                    ></div>
                    {/* <div tabIndex={0} role="button" className="btn m-1">
                      Hover
                  </div> */}
                    <ul tabIndex={0} className="dropdown-content top-8 menu">
                        <li>
                            <a onClick={() => signOut({ callbackUrl: "/" })}>
                                <LuLogOut size={20} /> Logout
                            </a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
