"use server";

export async function getVivinoPrice(id: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.vivino.com/nl-nl/prices?vintages[]=${id}`,
      {
        headers: {
          accept:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
          "x-requested-with": "XMLHttpRequest",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
        },
      }
    );

    if (!response.ok) {
      console.log(`Failed to fetch price: ${response.statusText}`);
      throw new Error(`Failed to fetch price: ${response.statusText}`);
    }

    const text = await response.text();
    console.log("Text:", text);

    // Updated regex to match exact price format
    const priceRegex = /wine-price-value'\s*\)\s*\.text\(\s*'([\d,]+)'\s*\)/;
    const match = text.match(priceRegex);
    console.log("Match:", match);
    if (match && match[1]) {
      const formattedPrice = match[1].replace(",", ".");
      match[1] = formattedPrice;
      console.log("Formatted price:", formattedPrice);
    }

    if (match && match[1]) {
      return match[1];
    }

    return null;
  } catch (error) {
    console.error("Error fetching Vivino price:", error);
    return null;
  }
}
