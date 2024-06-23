// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Adicione campos personalizados ao User
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}

// Adicione campos personalizados ao JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
