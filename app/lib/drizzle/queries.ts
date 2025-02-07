"use server";
import { db } from "./db";
import * as schema from "./schema";
import { Wine, WineWithId } from "@/app/lib/types";
import { eq, asc } from "drizzle-orm";

export const addWine = async (wine: Wine) => {
  return await db.insert(schema.WinesTable).values(wine).returning();
};

export const getWines = async (): Promise<WineWithId[]> => {
  return await db
    .select()
    .from(schema.WinesTable)
    .orderBy(asc(schema.WinesTable.createdAt));
};

export const deleteWine = async (id: number) => {
  return await db
    .delete(schema.WinesTable)
    .where(eq(schema.WinesTable.id, id))
    .returning();
};

export const getWineById = async (
  id: number
): Promise<WineWithId | undefined> => {
  const wines = await db
    .select()
    .from(schema.WinesTable)
    .where(eq(schema.WinesTable.id, id));
  return wines[0];
};

export const updateWine = async (id: number, wine: Partial<Wine>) => {
  return await db
    .update(schema.WinesTable)
    .set(wine)
    .where(eq(schema.WinesTable.id, id))
    .returning();
};
