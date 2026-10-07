"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getWineById, updateWine } from "@/app/lib/drizzle/queries";
import Modal from "../modal";

const thisYear = new Date().getFullYear();

export default function EditModal({ id, onClose }: { id: number; onClose: () => void }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    year: "",
    rating: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getWineById(id).then((data) => {
      if (data) {
        setFormData({
          name: data.name,
          image: data.image,
          price: data.price,
          year: data.year.toString(),
          rating: data.rating.toString(),
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateWine(id, {
        ...formData,
        year: parseInt(formData.year),
        rating: parseInt(formData.rating),
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error updating wine:", error);
      setError("Could not save your changes. Please try again.");
    }
  };

  const field = (key: keyof typeof formData) => ({
    id: `edit-${key}`,
    value: formData[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [key]: e.target.value }),
  });

  return (
    <Modal title="Edit wine" onClose={onClose} wide>
      {loading ? (
        <p className="text-ink-2">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <label htmlFor="edit-name">Name</label>
            <input type="text" required {...field("name")} />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="edit-image">Image URL</label>
            <input type="url" {...field("image")} />
          </div>
          <div>
            <label htmlFor="edit-price">Price (€)</label>
            <input type="number" step="0.01" min="0" required {...field("price")} />
          </div>
          <div>
            <label htmlFor="edit-year">Vintage</label>
            <input type="number" min="1900" max={thisYear} required {...field("year")} />
          </div>
          <div>
            <label htmlFor="edit-rating">Score (0-100)</label>
            <input type="number" min="0" max="100" required {...field("rating")} />
          </div>
          {error && <p role="alert" className="text-sm text-merlot sm:col-span-3">{error}</p>}
          <div className="flex justify-end gap-3 sm:col-span-3">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn">
              Save changes
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
