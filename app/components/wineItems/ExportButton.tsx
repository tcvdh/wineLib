"use client";

import { useState } from "react";
import { getExportData } from "@/app/lib/export";

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const csv = await getExportData();

      // Create a blob and download link
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `wine-collection-${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="p-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 disabled:bg-green-300"
    >
      {isExporting ? "Exporting..." : "Export to CSV"}
    </button>
  );
}
