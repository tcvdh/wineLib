"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Brand from "../brand";
import LoginButton from "./loginButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/wines", label: "My cellar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const linkClass = (href: string) =>
    `font-semibold no-underline ${
      pathname === href ? "text-merlot" : "text-ink hover:text-merlot"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-mist bg-chalk/90 backdrop-blur-md">
      <div className="wrap flex h-[68px] items-center gap-7">
        <Brand />
        <nav aria-label="Main" className="ml-auto hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          <a href="https://www.winelib.nl" className="font-semibold text-ink no-underline hover:text-merlot">
            About Winelib
          </a>
          <LoginButton />
        </nav>
        <button
          className="ml-auto cursor-pointer p-2 text-ink md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Menu"
        >
          <svg className="h-5 w-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav aria-label="Mobile" className="wrap flex flex-col gap-3 pb-5 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)} onClick={() => setIsOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href="https://www.winelib.nl" className="font-semibold text-ink no-underline">
            About Winelib
          </a>
          <div>
            <LoginButton toggleMenu={() => setIsOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  );
}
