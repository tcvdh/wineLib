'use client';
import { useRouter } from 'next/navigation';
import { deleteWine } from '@/app/lib/drizzle/db';

export default function DeleteButton({ id }: { id: number }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteWine(id);
            router.refresh();
        } catch (error) {
            console.error('Error deleting wine:', error);
        }
    };

    return (
        <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
        >
            Delete
        </button>
    );
}