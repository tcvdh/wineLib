"use server";

import { getWines } from "./drizzle/queries";
import { WineWithId } from "./types";

function normalizeText(text: string): string {
  return text
    .replace(/√¢/g, "â")
    .replace(/√©/g, "é")
    .replace(/√®/g, "è")
    .replace(/√´/g, "ê")
    .replace(/√§/g, "ä")
    .replace(/√°/g, "á")
    .replace(/√≥/g, "ó")
    .replace(/√±/g, "ñ")
    .replace(/√º/g, "ú")
    .replace(/√¶/g, "æ");
}

function convertToCSV(wines: WineWithId[]): string {
  // Define headers
  const headers = ["Name", "Price", "Year", "Rating", "Created At"];

  // Convert wines to CSV rows with normalized special characters
  const rows = wines.map((wine) => [
    `"${normalizeText(wine.name)}"`, // Normalize and wrap in quotes
    wine.price,
    wine.year,
    wine.rating,
    new Date(wine.createdAt).toISOString(),
  ]);

  // Combine headers and rows
  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

export async function getExportData() {
  try {
    const wines = await getWines();
    const csv = convertToCSV(wines);

    // Add BOM for proper UTF-8 encoding in Excel
    return "\ufeff" + csv;
  } catch (error) {
    console.error("Export data generation failed:", error);
    throw error;
  }
}
