"use server";
import { db } from "./db";
import * as schema from "./schema";
import { Wine, WineWithId } from "@/app/lib/types";
import { eq, asc, and } from "drizzle-orm";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

async function getCurrentUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) throw new Error("Not authenticated");
  return session.user.id;
}

export const addWine = async (wine: Wine) => {
  const userId = await getCurrentUserId();
  return await db
    .insert(schema.WinesTable)
    .values({ ...wine, userId })
    .returning();
};

export const getWines = async (): Promise<WineWithId[]> => {
  const userId = await getCurrentUserId();
  return await db
    .select()
    .from(schema.WinesTable)
    .where(eq(schema.WinesTable.userId, userId))
    .orderBy(asc(schema.WinesTable.createdAt));
};

export const deleteWine = async (id: number) => {
  const userId = await getCurrentUserId();
  return await db
    .delete(schema.WinesTable)
    .where(
      and(eq(schema.WinesTable.id, id), eq(schema.WinesTable.userId, userId))
    )
    .returning();
};

export const getWineById = async (
  id: number
): Promise<WineWithId | undefined> => {
  const userId = await getCurrentUserId();
  const wines = await db
    .select()
    .from(schema.WinesTable)
    .where(
      and(eq(schema.WinesTable.id, id), eq(schema.WinesTable.userId, userId))
    );
  return wines[0];
};

export const updateWine = async (id: number, wine: Partial<Wine>) => {
  const userId = await getCurrentUserId();
  return await db
    .update(schema.WinesTable)
    .set(wine)
    .where(
      and(eq(schema.WinesTable.id, id), eq(schema.WinesTable.userId, userId))
    )
    .returning();
};
