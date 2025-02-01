export const dynamic = "force-dynamic";
import WineList from "@/app/components/wine-list";
import AddItemButton from "@/app/components/wineItems/AddButton";

export default async function Wines() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-5 mb-5">
        <input
          type="text"
          placeholder="Search wines"
          className="border border-gray-300 rounded px-3 py-1"
        />
        <div className="ml-auto flex items-center gap-5">
          <AddItemButton />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b w-64">Wine</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b w-16">Actions</th>
            </tr>
          </thead>
          <WineList />
        </table>
      </div>
    </div>
  );
}
