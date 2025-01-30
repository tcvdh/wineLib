'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { fetchWinesFromVivino } from '@/app/lib/vivino'; // Adjust import path as needed
import { addWine } from '@/app/lib/drizzle/db';

interface Vino {
    name: string;
    link: string;
    thumb: string;
    region: string;
    country: string;
}
interface AddItemModalProps {
    onClose: () => void;
}

export default function AddItemModal({ onClose }: AddItemModalProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Vino[]>([]);
    const [selectedWine, setSelectedWine] = useState<Vino>();
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        if (!searchTerm.trim()) return; // Check if searchTerm is empty
        setLoading(true);
        const data = await fetchWinesFromVivino(searchTerm);
        setResults(data);
        setLoading(false);
    }

    function handleSelectWine(wine: Vino) {
        setSearchTerm(wine.name);
        setSelectedWine(wine);
    }

    async function handleSubmit() {
        if (!selectedWine) return;
        
        try {
            await addWine({
                name: selectedWine.name,
                image: selectedWine.thumb,
                price: price,
                year: parseInt(year),
                rating: parseInt(rating),
            });
            router.refresh();
            onClose();
        } catch (error) {
            console.error('Error adding wine:', error);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded w-full sm:w-1/2 border border-gray-700">
                <h2 className="mb-4 text-xl font-semibold">Add New Item</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        className="border p-2 w-full"
                        placeholder="Search wine..."
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-4 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>

                {/* Display loading or results */}
                {loading ? (
                    <p>Searching...</p>
                ) : (
                    <ul className="mb-4 max-h-60 overflow-auto border">
                        {results.map((wine, index) => (
                            <li
                                key={index}
                                className={`p-2 border-b cursor-pointer hover:bg-gray-100 ${selectedWine === wine ? 'bg-gray-200' : ''}`}
                                onClick={() => handleSelectWine(wine)}
                            >
                                {index + 1}. {wine.name}
                            </li>
                        ))}
                    </ul>
                )}

                {selectedWine && (
                    <div className="mt-4 space-y-2">
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border p-2 w-full"
                            placeholder="Price"
                            step="0.01"
                        />
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="border p-2 w-full"
                            placeholder="Year (1900-2024)"
                            min="1900"
                            max="2024"
                        />
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="border p-2 w-full"
                            placeholder="Rating (0-100)"
                            min="0"
                            max="100"
                        />
                    </div>
                )}

                {/* Save the selected item */}
                <button
                    className="mt-4 p-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <button
                    className="ml-4 mt-4 p-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}