import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface CustomUser extends User {
  token?: string; // Token é opcional, pois não é retornado por provedores OAuth
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3001/api/LoginAutenticacao/login?tipoLogin=comum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha,
          }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          return { id: credentials?.email, token: data.token } as CustomUser;
        } else {
          console.error("Failed to authorize user", res.status, data);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        const customUser = user as CustomUser;
        // Apenas defina accessToken se vier do fluxo de credenciais
        if (customUser.token) {
          token.accessToken = customUser.token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Apenas adicione accessToken se existir
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: true, // Habilitar logs de debug
};

export default NextAuth(authOptions);
