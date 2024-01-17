import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

export default function ChatIdPage({ params }: Props) {
  return (
    <div>
      Chat Id page
      <p>{params.chatId}</p>
    </div>
  );
}
