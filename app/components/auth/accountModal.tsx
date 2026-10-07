"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Modal from "../modal";

interface AccountModalProps {
  session: {
    user: {
      email: string;
      name?: string;
    };
  };
  onCloseAction: () => void;
}

export default function AccountModal({ session, onCloseAction }: AccountModalProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    onCloseAction();
    router.refresh();
  };

  return (
    <Modal title="Your account" onClose={onCloseAction}>
      <dl className="grid gap-0">
        {[
          ["Name", session.user.name || "Not set"],
          ["Email", session.user.email],
        ].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[80px_1fr] gap-3 border-t border-mist py-2.5">
            <dt className="text-sm text-ink-2">{k}</dt>
            <dd className="font-semibold break-all">{v}</dd>
          </div>
        ))}
      </dl>
      <button onClick={handleLogout} className="btn-ghost mt-6 w-full">
        Sign out
      </button>
    </Modal>
  );
}
