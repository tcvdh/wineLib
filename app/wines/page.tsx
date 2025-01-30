export const dynamic = 'force-dynamic';
import WineList from "@/app/components/wine-list";
import AddItemButton from '@/app/components/addItem/Button';

export default async function Wines() {
    return (
        <div className="p-5">
            <h1 className="text-3xl mb-5">Wines</h1>
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
                <AddItemButton />
            </div>
        </div>
    )
}