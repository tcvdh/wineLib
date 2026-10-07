"use client";

import { useState } from "react";
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
  const { data: session, isPending } = authClient.useSession();

  const handleClose = () => {
    setIsModalOpen(false);
    setIsSignup(false);
    toggleMenu?.();
  };

  if (isPending) {
    return <span className="btn btn-sm invisible">Sign in</span>;
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="btn btn-sm">
        {session ? "Account" : "Sign in"}
      </button>

      {isModalOpen &&
        (session ? (
          <AccountModal session={session} onCloseAction={handleClose} />
        ) : isSignup ? (
          <SignupModal onCloseAction={handleClose} onSwitchAction={() => setIsSignup(false)} />
        ) : (
          <SigninModal onCloseAction={handleClose} onSwitchAction={() => setIsSignup(true)} />
        ))}
    </>
  );
}
