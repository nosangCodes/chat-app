"use client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { MessageWithUser } from "@/types";
import React, { ElementRef, Fragment, useRef } from "react";
import MessageItem from "./message-item";
import { useChatSokcet } from "@/hooks/use-chat-socket";
import { Loader2 } from "lucide-react";
import { useChatScroll } from "@/hooks/use-chat-scroll";

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
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, hasNextPage, isFetchingNextPage, status, fetchNextPage } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });
  useChatSokcet({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  return (
    <div
      ref={chatRef}
      className="flex-1 flex flex-col py-4 overflow-y-auto p-2"
    >
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-[10px] w-fit p-1 mx-auto mb-2 bg-zinc-300 dark:bg-zinc-700/45 rounded-sm"
            >
              Load Previous Messages
            </button>
          )}
        </div>
      )}
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
      <div ref={bottomRef} />
    </div>
  );
}
