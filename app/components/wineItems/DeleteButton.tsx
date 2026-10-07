"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteWine } from "@/app/lib/drizzle/queries";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => {
        setIsConfirming(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfirming]);

  const handleDelete = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    try {
      await deleteWine(id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting wine:", error);
    }
    setIsConfirming(false);
  };

  return (
    <button
      onClick={handleDelete}
      className={`cursor-pointer ${
        isConfirming ? "font-bold text-merlot" : "text-ink-2 hover:text-merlot"
      }`}
    >
      {isConfirming ? "Click again to delete" : "Delete"}
    </button>
  );
}
