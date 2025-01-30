import Image from 'next/image';
import { getWines } from '@/app/lib/drizzle/db';
import { WineWithId } from '@/app/lib/types';
import DeleteButton from './addItem/DeleteButton';

export default async function WineList() {
    const wines: WineWithId[] = await getWines();

    return (
        <tbody>
            {wines.map((wine) => (
                <tr key={wine.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-center">{wine.name}</td>
                    <td className="py-2 px-4 border-b text-center">
                        {wine.image && (
                            <Image
                                src={wine.image}
                                alt={wine.name}
                                width={50}
                                height={50}
                                className="rounded-md mx-auto"
                                loading="lazy"
                            />
                        )}
                    </td>
                    <td className="py-2 px-4 border-b text-center">{wine.price}</td>
                    <td className="py-2 px-4 border-b text-center">{wine.year}</td>
                    <td className="py-2 px-4 border-b text-center">{wine.rating}/100</td>
                    <td className="py-2 px-4 border-b text-center">
                        <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                        <DeleteButton id={wine.id} />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}