"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";
import SigninModal from "../auth/signinModal";
import SignupModal from "../auth/signupModal";
import AccountModal from "../auth/accountModal";

export default function LoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [session, setSession] = useState<unknown>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data } = await authClient.getSession();
    setSession(data);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsSignup(false);
    checkSession(); // Refresh session state after modal closes
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  if (session) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Account
        </button>
        {isModalOpen && (
          <AccountModal
            onClose={() => setIsModalOpen(false)}
            onLogout={checkSession}
          />
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="ml-auto bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Login
      </button>

      {isModalOpen &&
        (isSignup ? (
          <SignupModal onClose={handleClose} onSwitch={toggleMode} />
        ) : (
          <SigninModal onClose={handleClose} onSwitch={toggleMode} />
        ))}
    </>
  );
}
