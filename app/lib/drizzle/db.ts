'use server';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';
import { Wine } from '@/app/lib/types';

const db = drizzle(sql, { schema });

export const addWine = async (wine: Wine) => {
  return await db.insert(schema.WinesTable).values(wine).returning();
};

export const getWines = async () => {
  return await db.select().from(schema.WinesTable);
};

// export const getUsers = async () => {
//   return db.query.WinesTable.findMany();
// };