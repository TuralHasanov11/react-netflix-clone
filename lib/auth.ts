import dbCLient from "@/lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession } from "next-auth/next";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(dbCLient),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Email and password are required!");

        const user = await dbCLient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password)
          throw new Error("Email or password is incorrect!");

        const authAttempt = await compare(credentials.password, user.password);

        if (!authAttempt) throw new Error("Email or password is incorrect!");

        return user;
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function auth(request: Request) {
  const session = await getServerSession(authOptions as NextAuthOptions);

  if (!session?.user?.email) throw new Error("Unauthenticated!");

  const user = await dbClient.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) throw new Error("Unauthenticated");

  return { user };
}

export async function isAuthenticated() {
  const session = await getServerSession(authOptions as NextAuthOptions);
  return session ? true : false;
}
