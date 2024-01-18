import ChatSearch from "./chat-search";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "../theme-toggle";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import ChatItem from "./chat-item";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

export default async function ChatSidebar({}: Props) {
  const user = await currentUser();
  if (!user) return redirect("/");
  const users = await db.user.findMany({
    where: {
      id: {
        not: user.id,
      },
    },
  });
  return (
    <div className="h-full flex flex-col bg-[#fafafa] dark:bg-[#1a1a1a]">
      <ChatSearch users={users} />
      <Separator className="bg-zinc-400 dark:bg-zinc-800" />
      <ScrollArea className="flex-1 py-2">
        {users.length > 0 &&
          users.map((user) => <ChatItem user={user} key={user.id} />)}
      </ScrollArea>
      <Separator className="bg-zinc-400 dark:bg-zinc-800" />
      <div className="mt-auto flex justify-between items-center p-2">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[25px] w-[25px]",
            },
          }}
        />
        <ThemeToggle />
      </div>
    </div>
  );
}
