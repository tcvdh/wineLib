import Image from "next/image";
import { getWines } from "@/app/lib/drizzle/queries";
import DeleteButton from "./wineItems/DeleteButton";
import EditButton from "./wineItems/EditButton";

function normalizeString(str: string) {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-dashed border-mist bg-paper px-6 py-16 text-center text-ink-2">
      {children}
    </div>
  );
}

export default async function WineList({ query, signedIn }: { query: string; signedIn: boolean }) {
  if (!signedIn) {
    return (
      <Empty>
        <p className="mb-1 font-serif text-2xl text-ink">Your cellar is waiting</p>
        <p>Use the Sign in button at the top to open your cellar, or create a free account.</p>
      </Empty>
    );
  }

  const wines = (await getWines()).filter((wine) =>
    normalizeString(wine.name).includes(normalizeString(query)),
  );

  if (wines.length === 0) {
    return (
      <Empty>
        {query ? `No wines matching "${query}".` : "No wines yet. Use Add wine to put your first bottle in the cellar."}
      </Empty>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {wines.map((wine) => (
        <li key={wine.id} className="flex gap-5 rounded-[20px] border border-mist bg-paper p-5">
          <div className="flex h-36 w-16 shrink-0 items-center justify-center">
            {wine.image && (
              <Image
                src={wine.image}
                alt=""
                width={64}
                height={144}
                className="h-full w-auto object-contain"
              />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <h2 className="mb-3 text-[1.2rem] leading-snug">{wine.name}</h2>
            <dl className="mb-3 grid grid-cols-3 gap-2 text-sm">
              {[
                ["Vintage", wine.year],
                ["Price", `€ ${wine.price}`],
                ["Score", `${wine.rating}/100`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-ink-2">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex gap-4 text-sm">
              <EditButton id={wine.id} />
              <DeleteButton id={wine.id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
