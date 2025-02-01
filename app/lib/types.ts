export type Wine = {
  name: string;
  image: string;
  price: string; // Will be converted to numeric(10,2)
  year: number; // Integer between 1900-2024
  rating: number; // Integer between 0-100
};

export type WineWithId = Wine & {
  id: number;
  createdAt: Date;
};
