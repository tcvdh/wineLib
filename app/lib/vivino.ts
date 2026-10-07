"use server";

interface Vino {
  name: string;
  link: string;
  thumb: string;
  price: string;
  region: string;
  country: string;
}

const BASE_URL = "https://www.vivino.com";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const RESULT_LIMIT = 3;

// Vivino's old HTML search now redirects to a client-rendered explore page,
// so we use the JSON endpoint that page uses.
export async function fetchWinesFromVivino(name: string): Promise<Vino[]> {
  if (!name) {
    throw new Error("Name query parameter is required");
  }

  const params = new URLSearchParams({
    country_code: "NL",
    currency_code: "EUR",
    language: "en",
    min_rating: "0",
    order_by: "ratings_count",
    order: "desc",
    page: "1",
    price_range_min: "0",
    price_range_max: "500",
    search_term: name,
  });

  try {
    const response = await fetch(`${BASE_URL}/api/explore/explore?${params}`, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matches: any[] = data?.explore_vintage?.matches ?? [];

    return matches.slice(0, RESULT_LIMIT).map(({ vintage, price }) => {
      const wine = vintage.wine;
      const amount = price?.amount
        ? price.amount / (price.bottle_quantity || 1)
        : null;
      return {
        name: vintage.name,
        link: `${BASE_URL}/w/${wine.id}?year=${vintage.year}`,
        thumb: `https:${vintage.image.variations.bottle_medium}`,
        price: amount ? amount.toFixed(2) : "",
        region: wine.region?.name ?? "",
        country: wine.region?.country?.native_name ?? "",
      };
    });
  } catch (error) {
    console.error("Exception:", error);
    throw new Error("Internal Server Error");
  }
}
