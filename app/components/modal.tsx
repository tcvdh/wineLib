"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  title,
  onClose,
  wide = false,
  children,
}: {
  title: string;
  onClose: () => void;
  wide?: boolean;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Portal: the sticky header uses backdrop-filter, which would trap a fixed overlay inside it.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative max-h-[90vh] w-full overflow-auto rounded-[22px] border border-mist bg-paper p-7 text-left shadow-[0_30px_60px_-30px_rgba(28,19,37,.35)] ${
          wide ? "max-w-2xl" : "max-w-md"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-5 cursor-pointer text-2xl leading-none text-ink-2 hover:text-ink"
        >
          ×
        </button>
        <h2 className="mb-6 text-3xl">{title}</h2>
        {children}
      </div>
    </div>,
    document.body,
  );
}
