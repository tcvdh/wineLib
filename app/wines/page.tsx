export const dynamic = "force-dynamic";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import WineList from "@/app/components/wineList";
import AddItemButton from "@/app/components/wineItems/AddButton";
import SearchBar from "@/app/components/SearchBar";
import ExportButton from "../components/wineItems/ExportButton";

interface WinesPageProps {
  searchParams?: Promise<{ query?: string }>;
}

export default async function Wines({ searchParams }: WinesPageProps) {
  const query = (await searchParams)?.query || "";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="wrap py-14">
      <div className="mb-10 flex flex-wrap items-end gap-5">
        <div className="mr-auto">
          <h1 className="mb-2 text-[clamp(2.2rem,4.6vw,3.5rem)]">My cellar</h1>
          <p className="text-ink-2">
            {session ? "Every bottle you have added, newest last." : "Sign in to see your wines."}
          </p>
        </div>
        {session && (
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <SearchBar />
            <AddItemButton session={session} />
            <ExportButton />
          </div>
        )}
      </div>

      <WineList query={query} signedIn={!!session} />
    </div>
  );
}
