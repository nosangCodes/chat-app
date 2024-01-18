"use client";
import { Search } from "lucide-react";
import { Fragment, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { User } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { getNameAcronym } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  users: User[];
};

export default function ChatSearch({ users }: Props) {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const router = useRouter();
  const onClick = (userId: string) => {
    router.push(`/chat/${userId}`);
    setOpenSearchModal(false);
  };
  return (
    <Fragment>
      <button
        onClick={() => setOpenSearchModal(true)}
        className="flex items-center rounded-md m-2 p-2 border transition 
      border-zinc-400 
      hover:border-zinc-900 
      dark:border-zinc-600 
      dark:hover:border-zinc-300"
      >
        <Search className="h-4 w-4" />
        <span className="ml-2 text-xs">Search...</span>
      </button>
      <CommandDialog open={openSearchModal} onOpenChange={setOpenSearchModal}>
        <CommandInput placeholder="Search user..." />
        <CommandList>
          {users?.length > 0 &&
            users?.map((user) => (
              <CommandItem
                className="cursor-pointer"
                onSelect={() => onClick(user.id)}
                key={user.id}
              >
                <div className="flex flex-row items-center">
                  <UserAvatar
                    src={user?.imageUrl}
                    fallback={getNameAcronym(user?.firstName, user?.lastName)}
                  />
                  <span className="ml-2 text-base">{user.userName}</span>
                </div>
              </CommandItem>
            ))}
        </CommandList>
      </CommandDialog>
    </Fragment>
  );
}
