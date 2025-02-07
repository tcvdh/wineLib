"use client";

import React, { useState } from "react";
import AddItemModal from "./AddModal";
import { Session } from "@/app/lib/auth-client";

interface AddItemButtonProps {
  session: Session | null;
}

export default function AddItemButton({ session }: AddItemButtonProps) {
  const [showModal, setShowModal] = useState(false);

  if (!session?.user.id) {
    return null;
  }

  return (
    <>
      <button
        className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Add Item
      </button>

      {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
    </>
  );
}
