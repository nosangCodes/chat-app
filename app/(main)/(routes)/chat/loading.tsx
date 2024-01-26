import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="h-10 w-10 text-zinc-800 dark:text-zinc-300 animate-spin " />
    </div>
  );
}
