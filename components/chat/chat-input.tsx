"use client";
import { Input } from "@/components/ui/input";
type Props = {
  name: string;
};

export default function ChatInput({ name }: Props) {
  return (
    <div className="relative">
      <Input
        className="ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 bg-zinc-200 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-600"
        type="text"
        placeholder={`Message ${name}`}
      />
    </div>
  );
}
