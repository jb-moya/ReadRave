import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                custom: {
                    "static-1": "rgb(var(--s-color-1) / <alpha-value>)",
                    "static-2": "rgb(var(--s-color-2) / <alpha-value>)",
                    "static-3": "rgb(var(--s-color-3) / <alpha-value>)",
                    "static-4": "rgb(var(--s-color-4) / <alpha-value>)",
                    "static-5": "rgb(var(--s-color-5) / <alpha-value>)",

                    "color-1": "rgb(var(--color-1) / <alpha-value>)",
                    "color-2": "rgb(var(--color-2) / <alpha-value>)",
                    "color-3": "rgb(var(--color-3) / <alpha-value>)",
                    "color-4": "rgb(var(--color-4) / <alpha-value>)",
                    "color-5": "rgb(var(--color-5) / <alpha-value>)",
                },
            },
            transitionTimingFunction: {
                elegant: "cubic-bezier(1, 0, 0, 1)",
            },
            keyframes: {
                "custom-enter": {
                    "0%": { opacity: "0", transform: "translateY(-50%)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "custom-exit": {
                    "0%": { opacity: "1", transform: "translateY(0)" },
                    "100%": { opacity: "0", transform: "translateY(-50%)" },
                },
            },
            animation: {
                "custom-enter": "custom-enter .5s elegant",
                "custom-exit": "custom-exit .5s elegant",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
        require("daisyui"),
    ],
};
export default config;
