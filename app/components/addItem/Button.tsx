'use client';

import React, { useState } from 'react';
import AddItemModal from './AddModal';

export default function AddItemButton() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="mt-4 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                onClick={() => setShowModal(true)}
            >
                Add Item
            </button>

            {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
        </>
    );
}