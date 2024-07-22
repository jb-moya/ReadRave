import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToasterContext } from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import Image from "next/image";
import bgImage from "./assets/bg.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ReadRave",
    description: "A Book Social Media Web App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <body className={`${inter.className}`}>
                <AuthContext>
                    <StoreProvider>
                        <ToasterContext />

                        <div className="top-0 absolute left-0 bg-transparent opacity-50 pointer-events-none w-screen max-w-full h-72">
                            <Image
                                src={bgImage}
                                alt="bg"
                                className="absolute w-full h-full object-cover"
                            />
                            <div className="absolute top-0 left-0 w-screen max-w-full pointer-events-none h-full bg-gradient-to-t from-custom-color-1  via-custom-color-1/50 to-custom-color-1/5"></div>
                        </div>

                        <main className="sm:max-w-4xl max-w-2xl mx-auto relative">
                            {children}
                        </main>
                    </StoreProvider>
                </AuthContext>
            </body>
        </html>
    );
}
