import { auth } from "@clerk/nextjs";
import { db } from "./db";

export async function currentUser() {
  const { userId } = auth();
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
