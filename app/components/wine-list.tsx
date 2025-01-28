import Image from 'next/image';
import { getWine } from '@/app/lib/wine';

type Wine = {
    name: string;
    image: string;
    price: number;
    year: number;
    rating: number;
};


export default async function WineList() {
    const wines = await getWine();

    return (
        <tbody>
            {wines.map((wine: Wine, index: number) => (
                <tr key={index}>
                    <td className="py-2 px-4 border-b">{wine.name}</td>
                    <td className="py-2 px-4 border-b">
                        <Image src={wine.image} alt={wine.name} width={50} height={50} />
                    </td>
                    <td className="py-2 px-4 border-b">${wine.price.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{wine.year}</td>
                    <td className="py-2 px-4 border-b">{wine.rating}</td>
                </tr>
            ))}
        </tbody>
    );
}