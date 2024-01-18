"use client";
import { User } from "@prisma/client";
import React from "react";
import UserAvatar from "../user-avatar";
import { cn, getNameAcronym } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";

type Props = {
  user: User;
};

export default function ChatItem({ user }: Props) {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/chat/${user.id}`);
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "px-2 py-2 mb-2 flex items-center hover:bg-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 transition rounded-md cursor-pointer",
        params.chatId === user.id && "bg-zinc-300 dark:bg-zinc-800"
      )}
    >
      <UserAvatar
        src={user?.imageUrl}
        fallback={getNameAcronym(user?.firstName, user?.lastName)}
      />
      <div className="ml-2">
        <p>{user.userName}</p>
      </div>
    </div>
  );
}
