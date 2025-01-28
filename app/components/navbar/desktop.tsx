"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {
    const pathname = usePathname();
    
    return (
        <nav className="fixed top-0 w-full p-4 z-50 border-b border-gray-400 shadow-md bg-gray-700">
            <ul className="flex space-x-4">
                <li>
                    <Link className={`${pathname === "/" ? "font-bold underline underline-offset-8" : "" } text-white`} href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className={`${pathname === "/wines" ? "font-bold underline underline-offset-8" : "" } text-white`} href="/wines">
                        Wines
                    </Link>
                </li>
            </ul>
        </nav>
    )
}