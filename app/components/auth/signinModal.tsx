"use client";

import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

interface SigninModalProps {
  onClose: () => void;
  onSwitch: () => void;
}

export default function SigninModal({ onClose, onSwitch }: SigninModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await authClient.signIn.email({
        email,
        password,
      });
      router.refresh();
      onClose(); // This will trigger session check in LoginButton
    } catch (err) {
      setError("Invalid email or password");
      console.error("Sign in error:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96 border border-gray-300 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="mb-6 text-2xl font-semibold text-center">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitch();
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
