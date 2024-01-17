import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  fallback: string;
  className?: string;
};

export default function UserAvatar({ src, fallback, className }: Props) {
  return (
    <Avatar
      className={cn(
        "w-8 h-8 text-xs flex justify-center items-center border border-zinc-300 dark:border-zinc-500",
        className
      )}
    >
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
