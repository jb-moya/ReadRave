import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ToasterContext } from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ReadRave",
    description: "A Book E-Commerce Web App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <body className={inter.className}>
                <AuthContext>
                    <StoreProvider>
                        <ToasterContext />
                        <main className="sm:max-w-4xl max-w-2xl mx-auto">
                            {children}
                        </main>
                    </StoreProvider>
                </AuthContext>
            </body>
        </html>
    );
}
