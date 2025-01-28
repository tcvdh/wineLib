import { fetchWinesFromVivino } from "./vivino";

const wines = [
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

export async function getWine() {
    async function fetchImage(wineName: string) {
        const data = await fetchWinesFromVivino(wineName);
        return data[0]?.thumb || "";
    };

    for (const wine of wines) {
        wine.image = await fetchImage(wine.name);
    }
    return wines;
}