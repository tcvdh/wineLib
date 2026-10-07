import Brand from "./brand";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-[0.95rem] text-[#C9C2D3]">
      <div className="wrap grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Brand dark />
          <p className="mt-3 max-w-md">
            A personal wine cellar for the bottles you have tried, own or want.
          </p>
        </div>
        <ul className="grid gap-2">
          {[
            ["https://www.winelib.nl", "About Winelib"],
            ["https://www.winelib.nl/privacy.html", "Privacy policy"],
            ["https://www.winelib.nl/terms.html", "Terms of use"],
            ["mailto:info@winelib.nl", "info@winelib.nl"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-[#E8E2F0] no-underline hover:text-[#F2D58A] hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="border-t border-[#3A2F47] pt-5 text-sm md:col-span-2">
          Winelib is for adults of legal drinking age. Please enjoy wine
          responsibly. &copy; 2026 Winelib, by Thijs van den Heuvel. Built with Claude Code.
        </p>
      </div>
    </footer>
  );
}
