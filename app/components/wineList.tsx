import Image from "next/image";
import { getWines } from "@/app/lib/drizzle/db";
import { WineWithId } from "@/app/lib/types";
import DeleteButton from "./wineItems/DeleteButton";
import Editbutton from "./wineItems/EditButton";

interface WineListProps {
  query: string;
}

export default async function WineList({ query }: WineListProps) {
  function normalizeString(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const wines: WineWithId[] = await getWines();

  const filteredWines = wines.filter((wine) =>
    normalizeString(wine.name).includes(normalizeString(query))
  );

  if (filteredWines.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className="py-8 text-center text-gray-500">
            No wines found {query && `matching "${query}"`}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {filteredWines.map((wine) => (
        <tr key={wine.id} className="hover:bg-gray-50">
          <td className="py-2 px-4 border-b text-center">{wine.name}</td>
          <td className="py-2 px-4 border-b text-center">
            {wine.image && (
              <Image
                src={wine.image}
                alt={wine.name}
                width={50}
                height={0}
                className="rounded-md mx-auto"
                loading="lazy"
                style={{ width: "auto" }}
              />
            )}
          </td>
          <td className="py-2 px-4 border-b text-center">€ {wine.price}</td>
          <td className="py-2 px-4 border-b text-center">{wine.year}</td>
          <td className="py-2 px-4 border-b text-center">{wine.rating}/100</td>
          <td className="py-2 px-4 border-b text-center">
            <Editbutton id={wine.id} />
            <DeleteButton id={wine.id} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
