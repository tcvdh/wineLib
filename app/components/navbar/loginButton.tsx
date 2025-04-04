"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";
import SigninModal from "../auth/signinModal";
import SignupModal from "../auth/signupModal";
import AccountModal from "../auth/accountModal";

export default function LoginButton({
  toggleMenu,
}: {
  toggleMenu?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [session, setSession] = useState<{
    user: {
      email: string;
      name?: string;
    };
  } | null>(null);

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
    checkSession();
    toggleMenu?.();
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
            session={session}
            onCloseAction={handleClose}
            onLogoutAction={checkSession}
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
          <SignupModal
            onCloseAction={handleClose}
            onSwitchAction={toggleMode}
          />
        ) : (
          <SigninModal
            onCloseAction={handleClose}
            onSwitchAction={toggleMode}
          />
        ))}
    </>
  );
}
