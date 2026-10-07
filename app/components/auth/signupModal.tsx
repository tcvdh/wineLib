"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Modal from "../modal";

interface SignupModalProps {
  onCloseAction: () => void;
  onSwitchAction: () => void;
}

export default function SignupModal({ onCloseAction, onSwitchAction }: SignupModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await authClient.signUp.email(
      { email, password, name },
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
    <Modal title="Create your cellar" onClose={onCloseAction}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password" id="confirmPassword" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        {error && <p role="alert" className="text-center text-sm text-merlot">{error}</p>}

        <button type="submit" className="btn w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="text-center text-xs text-ink-2">
          By creating an account you confirm you are of legal drinking age and agree to the{" "}
          <a href="https://www.winelib.nl/terms.html">terms</a>.
        </p>
      </form>

      <p className="mt-5 text-center text-sm text-ink-2">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchAction} className="cursor-pointer font-semibold text-merlot underline underline-offset-3">
          Sign in
        </button>
      </p>
    </Modal>
  );
}
