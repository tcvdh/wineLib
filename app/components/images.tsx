'use client';

import Image from 'next/image';
import { useState } from 'react';

type Wine = {
    id: number;
    image: string;
    visited: number;
    place: string;
    description: string;
}

export default function Images({ data }: { data: Wine[] }) {
    const [activeId, setActiveId] = useState(0);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((wine: Wine) => (
                <div 
                    key={wine.id} 
                    className="relative w-full h-64"
                    onMouseEnter={() => setActiveId(wine.id)}
                    onMouseLeave={() => setActiveId(0)}
                >
                    <Image src={wine.image} alt={wine.place} width={500} height={500} className="object-cover w-full h-full" priority />
                    <div className={`absolute bottom-0 w-full p-2 bg-black bg-opacity-50 text-white ${activeId === wine.id ? 'visible' : 'hidden'}`}>
                        <h2 className="text-xl">{wine.place}</h2>
                        <p>{wine.description}</p>
                    </div>
                </div>
            ))}
        </div>
        )
}