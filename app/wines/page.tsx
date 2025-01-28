import WineList from "../components/wine-list";

async function fetchWines() {
    const api = `${process.env.VERCEL_URL}/api/wine`;
    const response = await fetch(api);
    if (!response.ok) {
        throw new Error('Failed to fetch wines');
    }
    return await response.json();
}

export default async function Wines() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const wines = await fetchWines();

    return (
        <div className="p-5">
            <h1 className="text-3xl mb-5">Wines</h1>
            <WineList wines={wines} />
        </div>
    )
}