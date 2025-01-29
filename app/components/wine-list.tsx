export const dynamic = 'force-dynamic';
import Image from 'next/image';
import { getWines } from '@/app/lib/drizzle/db';
import { Wine } from '@/app/lib/types';

export default async function WineList() {
    const wines: Wine[] = await getWines();

    return (
        <tbody>
            {wines.map((wine, index) => (
                <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{wine.name}</td>
                    <td className="py-2 px-4 border-b">
                        {wine.image && (
                            <Image
                                src={wine.image}
                                alt={wine.name}
                                width={50}
                                height={50}
                                className="rounded-md"
                                loading="lazy"
                            />
                        )}
                    </td>
                    <td className="py-2 px-4 border-b">${wine.price}</td>
                    <td className="py-2 px-4 border-b">{wine.year}</td>
                    <td className="py-2 px-4 border-b">{wine.rating}/100</td>
                </tr>
            ))}
        </tbody>
    );
}