"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Modal from "../modal";

interface SigninModalProps {
  onCloseAction: () => void;
  onSwitchAction: () => void;
}

export default function SigninModal({ onCloseAction, onSwitchAction }: SigninModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    await authClient.signIn.email(
      { email, password },
      {
        onRequest: () => setLoading(true),
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message);
        },
        onSuccess: () => {
          setLoading(false);
          onCloseAction();
          router.refresh();
        },
      },
    );
  };

  return (
    <Modal title="Sign in" onClose={onCloseAction}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <p role="alert" className="text-center text-sm text-merlot">{error}</p>}

        <button type="submit" className="btn w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-ink-2">
        New to Winelib?{" "}
        <button type="button" onClick={onSwitchAction} className="cursor-pointer font-semibold text-merlot underline underline-offset-3">
          Create an account
        </button>
      </p>
    </Modal>
  );
}
