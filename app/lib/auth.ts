import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minimumPasswordLength: 8,
  },
  advanced: {
    cookiePrefix: "WineLib",
  },
});

export type Auth = typeof auth;
