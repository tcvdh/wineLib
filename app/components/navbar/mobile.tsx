"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full p-4 z-50 border-b border-gray-400 shadow-md bg-gray-700">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">WineLib</div>
        <button className="text-white" onClick={toggleMenu}>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <ul className={`flex-col ${isOpen ? "flex" : "hidden"} mt-4 space-y-2`}>
        <li>
          <Link
            className={`${
              pathname === "/" ? "font-bold underline underline-offset-8" : ""
            } text-white block px-2 py-1`}
            href="/"
            onClick={toggleMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathname === "/wines"
                ? "font-bold underline underline-offset-8"
                : ""
            } text-white block px-2 py-1`}
            href="/wines"
            onClick={toggleMenu}
          >
            Wines
          </Link>
        </li>
      </ul>
    </nav>
  );
}
