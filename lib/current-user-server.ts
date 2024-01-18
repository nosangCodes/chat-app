import { NextApiRequest } from "next";
import { db } from "./db";
import { getAuth } from "@clerk/nextjs/server";

export async function getCurrentUser(req: NextApiRequest) {
  const { userId } = getAuth(req);
  if (!userId) return null;
  try {
    const user = await db.user.findUnique({
      where: { externalId: userId },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
