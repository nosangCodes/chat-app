import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {};

export default async function page({}: Props) {
  const currentUserData = await currentUser();
  if (!currentUserData) return redirectToSignIn();

  const user = await db.user.findFirst({
    where: {
      id: {
        not: currentUserData.id,
      },
    },
  });

  if (!user?.id) return null;
  return redirect(`/chat/${user.id}`);
}
