import Link from "next/link";

export default function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Winelib home"
      className={`flex items-center gap-2.5 font-serif text-2xl no-underline ${
        dark ? "text-white hover:text-white" : "text-ink hover:text-ink"
      }`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-[30px] w-[30px]">
        <rect width="32" height="32" rx="8" fill="#7A1F45" />
        <path d="M9.5 6.5h13c.3 6.8-2.6 10.8-6.5 10.8S9.2 13.3 9.5 6.5z" fill="#F1EFF3" />
        <path d="M16 17.3v6.4M11.5 25.5h9" stroke="#F1EFF3" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M10.2 10.5h11.6" stroke="#7A1F45" strokeWidth="2" />
      </svg>
      Winelib
    </Link>
  );
}
