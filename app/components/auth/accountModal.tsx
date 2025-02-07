"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

interface AccountModalProps {
  onClose: () => void;
  onLogout: () => void;
}

interface UserData {
  email?: string;
  name?: string;
}

export default function AccountModal({ onClose, onLogout }: AccountModalProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await authClient.getSession();
      if (data) {
        setUserData({
          email: data.user.email,
          name: data.user.name || "Not set",
        });
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    onClose();
    onLogout();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg w-full sm:w-96 border border-gray-300 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <h2 className="mb-6 text-2xl font-semibold text-center">
          Account Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-900">{userData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-gray-900">{userData.name}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
