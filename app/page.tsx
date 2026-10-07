import Link from "next/link";

const features = [
  {
    title: "Find any wine",
    text: "Search a wine by name and add it with its bottle shot and current price.",
  },
  {
    title: "Keep your cellar",
    text: "Every bottle you own, tried or want, with vintage, price and your score.",
  },
  {
    title: "Rate and export",
    text: "Score wines out of 100 and export your whole cellar to CSV whenever you like.",
  },
];

export default function Home() {
  return (
    <>
      <section className="py-20 md:py-28">
        <div className="wrap">
          <h1 className="mb-6 max-w-3xl text-[clamp(2.5rem,5.4vw,4.3rem)]">
            Your wine cellar, <span className="text-merlot">in one place.</span>
          </h1>
          <p className="max-w-[34em] text-xl leading-normal text-ink-2">
            Keep every bottle you have tried, own or want. Add wines in
            seconds, rate them and always know what is on your shelf.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/wines" className="btn">
              Open my cellar
            </Link>
            <a href="https://www.winelib.nl" className="btn-ghost">
              About Winelib
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-mist bg-paper py-20">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className={i ? "md:border-l md:border-mist md:pl-10" : ""}>
              <h2 className="mb-2.5 text-[1.35rem] leading-tight">{f.title}</h2>
              <p className="text-ink-2">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
