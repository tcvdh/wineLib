import Image from 'next/image';

type Wine = {
    name: string;
    image: string;
    price: number;
    year: number;
    rating: number;
};


export default function WineList({ wines }: { wines: Wine[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Year</th>
                        <th className="py-2 px-4 border-b">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {wines.map((wine, index) => (
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
            </table>
        </div>
    );
}