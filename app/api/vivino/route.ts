import { fetchWinesFromVivino } from "@/app/lib/vivino";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");

  if (!name) {
    return new Response(
      JSON.stringify({ error: "Name query parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const vinos = await fetchWinesFromVivino(name);
    return new Response(JSON.stringify(vinos), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Exception:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
