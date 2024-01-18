import React from "react";
import UserAvatar from "../user-avatar";
import { cn } from "@/lib/utils";

type Props = {
  content: string;
  userName: string;
  imageUrl: string;
  active: boolean;
};

export default function MessageItem({
  content,
  userName,
  imageUrl,
  active,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-row items-center mt-2 py-2 bg-slate-200 dark:bg-zinc-800/25 px-1 rounded-md",
        active && "flex-row-reverse"
      )}
    >
      <UserAvatar src={imageUrl} className="w-7 h-7" />
      <div className="mx-2 flex flex-col">
        <span className=" text-[8px] font-semibold text-zinc-500 dark:text-zinc-700">
          {userName}
        </span>
        <p className="text-[12px]">{content}</p>
      </div>
    </div>
  );
}
