import { createAuthClient } from "better-auth/react";

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

// Same-origin by default, so it works on app.winelib.nl, previews and localhost.
export const authClient = createAuthClient();

export type AuthClient = typeof authClient;
