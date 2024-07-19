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
        },
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
};
export default config;
