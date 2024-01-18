import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages.";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

export default async function ChatIdPage({ params }: Props) {
  const user = await db.user.findUnique({
    where: {
      id: params.chatId,
    },
  });

  if (!user) return redirect("/");

  return (
    <div className="flex flex-col h-full">
      <ChatHeader user={user} />
      <ChatMessages />
      <div className="mx-2 mt-auto mb-2">
        <ChatInput name={user.userName} />
      </div>
    </div>
  );
}
