import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";

export const initialUser = async () => {
  const userData = await currentUser();
  if (!userData) return redirectToSignIn();

  const user = await db.user.findUnique({
    where: {
      externalId: userData.id,
    },
  });

  if (user) return user;

  const newUser = await db.user.create({
    data: {
      externalId: userData.id,
      email: userData.emailAddresses[0].emailAddress,
      firstName: userData?.firstName ? userData.firstName : "",
      lastName: userData?.lastName ? userData.lastName : "",
      imageUrl: userData.imageUrl,
      userName: userData?.username ? userData.username : "",
      emailVerified:
        userData?.emailAddresses?.[0]?.verification?.status === "verified",
    },
  });

  return newUser;
};
