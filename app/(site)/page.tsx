import Image from "next/image";
import AuthForm from "../components/AuthForm";
import clsx from "clsx";
import { merriweather } from "@/fonts";
import ToggleTheme from "../components/ToggleTheme";

export default function Home() {
    return (
        <div className="flex w-[300px] mx-auto min-h-screen flex-col items-center justify-center py-2">
            <div className="flex flex-row items-center justify-between mb-4 w-full">
                <h1 className="text-5xl">
                    <span className={"font-thin text-custom-color-5"}>
                        read
                    </span>
                    <span
                        className={`${merriweather.className} text-custom-static-2`}
                    >
                        rave
                    </span>
                </h1>
                <div className="ml-4">
                    <ToggleTheme/>
                </div>
            </div>
            <AuthForm />
        </div>
    );
}
