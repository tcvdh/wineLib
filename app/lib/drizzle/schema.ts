import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

export const WinesTable = pgTable(
  "wines",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    image: text("image").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    year: integer("year").notNull(),
    rating: integer("rating").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (wines) => [uniqueIndex("unique_idx").on(wines.id)]
);
