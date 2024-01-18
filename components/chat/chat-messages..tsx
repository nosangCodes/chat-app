"use client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { MessageWithUser } from "@/types";
import React, { Fragment } from "react";
import MessageItem from "./message-item";

type Props = {
  chatId: string;
  apiUrl: string;
  paramKey: "conversationId";
  paramValue: string;
  loggedInUserId: string;
};

export default function ChatMessages({
  chatId,
  apiUrl,
  paramKey,
  paramValue,
  loggedInUserId,
}: Props) {
  const queryKey = `chat:${chatId}`;

  const { data } = useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto p-2">
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((page, i) => (
          <Fragment key={i}>
            {page?.items?.map((message: MessageWithUser) => (
              <MessageItem
                active={loggedInUserId === message.user.id}
                key={message.id}
                userName={message.user.userName}
                imageUrl={message.user.imageUrl}
                content={message.content as string}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
