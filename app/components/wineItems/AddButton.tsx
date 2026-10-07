"use client";

import { useState } from "react";
import AddItemModal from "./AddModal";
import { Session } from "@/app/lib/auth-client";

export default function AddItemButton({ session }: { session: Session | null }) {
  const [showModal, setShowModal] = useState(false);

  if (!session?.user.id) {
    return null;
  }

  return (
    <>
      <button className="btn" onClick={() => setShowModal(true)}>
        Add wine
      </button>
      {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
    </>
  );
}
