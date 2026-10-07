"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchWinesFromVivino } from "@/app/lib/vivino";
import { addWine } from "@/app/lib/drizzle/queries";
import Modal from "../modal";

interface Vino {
  name: string;
  link: string;
  thumb: string;
  price: string;
  region: string;
  country: string;
}

const thisYear = new Date().getFullYear();

export default function AddItemModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Vino[]>([]);
  const [selectedWine, setSelectedWine] = useState<Vino>();
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editableName, setEditableName] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");
    try {
      setResults(await fetchWinesFromVivino(searchTerm));
    } catch {
      setError("Search failed. Please try again.");
    }
    setLoading(false);
  }

  function handleSelectWine(wine: Vino) {
    setEditableName(wine.name);
    setSelectedWine(wine);
    setPrice(wine.price);
    const yearMatch = wine.name.match(/\d{4}$/);
    if (yearMatch) {
      const potentialYear = parseInt(yearMatch[0]);
      if (potentialYear >= 1900 && potentialYear <= thisYear) {
        setYear(yearMatch[0]);
        setEditableName(wine.name.slice(0, -4).trim());
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedWine) return;

    try {
      await addWine({
        name: editableName,
        image: selectedWine.thumb,
        price: price,
        year: parseInt(year),
        rating: parseInt(rating),
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error adding wine:", error);
      setError("Could not save this wine. Check the fields and try again.");
    }
  }

  return (
    <Modal title="Add a wine" onClose={onClose} wide>
      <form onSubmit={handleSearch} className="mb-4 flex gap-3">
        <input
          type="search"
          aria-label="Wine name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, e.g. Château Margaux"
          autoFocus
        />
        <button type="submit" className="btn shrink-0" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {results.length > 0 && (
        <ul className="mb-5 grid gap-2">
          {results.map((wine, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => handleSelectWine(wine)}
                aria-pressed={selectedWine === wine}
                className={`w-full cursor-pointer rounded-xl border-[1.5px] px-4 py-3 text-left transition-colors ${
                  selectedWine === wine ? "border-merlot bg-merlot/5" : "border-mist hover:border-ink"
                }`}
              >
                <span className="font-semibold">{wine.name}</span>
                {(wine.region || wine.country) && (
                  <span className="block text-sm text-ink-2">
                    {[wine.region, wine.country].filter(Boolean).join(", ")}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p role="alert" className="mb-4 text-sm text-merlot">{error}</p>}

      {selectedWine && (
        <form onSubmit={handleSubmit} className="grid gap-4 border-t border-mist pt-5 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <label htmlFor="add-name">Name</label>
            <input id="add-name" type="text" value={editableName} onChange={(e) => setEditableName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="add-price">Price (€)</label>
            <input id="add-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" min="0" required />
          </div>
          <div>
            <label htmlFor="add-year">Vintage</label>
            <input id="add-year" type="number" value={year} onChange={(e) => setYear(e.target.value)} min="1900" max={thisYear} required />
          </div>
          <div>
            <label htmlFor="add-rating">Score (0-100)</label>
            <input id="add-rating" type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="0" max="100" required />
          </div>
          <div className="flex justify-end gap-3 sm:col-span-3">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn">
              Add to cellar
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
