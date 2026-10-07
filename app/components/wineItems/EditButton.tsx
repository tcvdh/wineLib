"use client";
import { useState } from "react";
import EditModal from "./EditModal";

export default function EditButton({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="cursor-pointer font-semibold text-merlot hover:text-merlot-d">
        Edit
      </button>
      {showModal && <EditModal id={id} onClose={() => setShowModal(false)} />}
    </>
  );
}
