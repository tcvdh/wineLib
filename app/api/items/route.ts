export async function GET(request: Request) {
    const api = "https://webtech.tcvdh.nl/api/items";
    const response = await fetch(api);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
        headers: {
            "content-type": "application/json",
        },
    });
}