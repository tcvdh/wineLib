"use client";
import { useState } from "react";
import EditModal from "./EditModal";

export default function EditButton({ id }: { id: number }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-blue-500 hover:text-blue-700 mr-2"
      >
        Edit
      </button>
      {showModal && <EditModal id={id} onClose={() => setShowModal(false)} />}
    </>
  );
}
