import { createAuthClient } from "better-auth/react";

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export const authClient = createAuthClient({
  baseURL:
    "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "http://localhost:3000",
  tokenStorage: "localStorage",
});

export type AuthClient = typeof authClient;
