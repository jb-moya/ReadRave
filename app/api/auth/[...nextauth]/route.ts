import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                console.log("TJLKEJRLEJLKR");
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // users with email/password provider should have hashedPassword
                // other provider should not have hashedPassword
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return user;
            },
        }),
    ],

    // pages: {
    //     signIn: "/",
    // },
    // callbacks: {
    //     async session({
    //         session,
    //         token,
    //         user,
    //     }: {
    //         session: Session;
    //         token: JWT;
    //         user: AdapterUser;
    //     }) {
    //         console.log("session", session, token, user);
    //         // // Fetch user data from the database using the user ID from the session token
    //         // const dbUser = await prisma.user.findUnique({
    //         //     where: { email: session.user?.email || undefined },
    //         // });

    //         // // Add additional user information to the session
    //         // if (dbUser) {
    //         //     session.user.id = dbUser.id;
    //         //     session.user.name = dbUser.name;
    //         // }

    //         return session;
    //     },
    // },
    
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };