export const wines = [
    {
        name: "Gruaud Larose",
        image: "https://images.vivino.com/thumbs/9dJEcnU_RnecZTWYx0Kh3Q_pb_x960.png",
        price: 10.99,
        year: 2019,
        rating: 4.5
    },
    {
        name: "La Tour Carnet",
        image: "https://images.vivino.com/thumbs/9dJEcnU_RnecZTWYx0Kh3Q_pb_x960.png",
        price: 12.99,
        year: 2018,
        rating: 4.0
    },
    {
        name: "Pontet Canet",
        image: "https://images.vivino.com/thumbs/9dJEcnU_RnecZTWYx0Kh3Q_pb_x960.png",
        price: 14.99,
        year: 2017,
        rating: 4.2
    }
];

export async function GET(request: Request) {
    const fetchImage = async (wineName: string) => {
        const response = await fetch(`${process.env.VERCEL_URL}/api/vivino?name=${encodeURIComponent(wineName)}`);
        const data = await response.json();
        console.log(data)
        return data[0]?.thumb || "";
    };

    // for (const wine of wines) {
    //     wine.image = await fetchImage(wine.name);
    // }
    console.log(wines);
    return new Response(JSON.stringify(wines), {
        headers: {
            "content-type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    wines.push(body);
    console.log(wines);
    return new Response(JSON.stringify(wines), {
        headers: {
            "content-type": "application/json",
        },
    });
}