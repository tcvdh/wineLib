"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getWineById, updateWine } from "@/app/lib/drizzle/queries";

interface EditModalProps {
  id: number;
  onClose: () => void;
}

export default function EditModal({ id, onClose }: EditModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    year: "",
    rating: "",
  });

  useEffect(() => {
    const loadWine = async () => {
      const data = await getWineById(id);
      if (data) {
        setFormData({
          name: data.name,
          image: data.image,
          price: data.price,
          year: data.year.toString(),
          rating: data.rating.toString(),
        });
      }
    };
    loadWine();
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
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded w-full sm:w-1/2 border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Edit Wine</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Name"
          />
          <input
            type="text"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Image URL"
          />
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Price"
            step="0.01"
          />
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Year"
            min="1900"
            max="2024"
          />
          <input
            type="number"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Rating"
            min="0"
            max="100"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
