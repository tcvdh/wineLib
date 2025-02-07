import { createAuthClient } from "better-auth/react";

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export const authClient = createAuthClient({
  baseURL: process.env.VERCEL_URL || "http://localhost:3000",
  tokenStorage: "localStorage",
});

export type AuthClient = typeof authClient;
