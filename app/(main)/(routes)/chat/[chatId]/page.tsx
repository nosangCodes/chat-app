import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages.";
import { getOrCreateConversation } from "@/lib/conversation";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { ConversationWithUsers } from "@/types";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};

export default async function ChatIdPage({ params }: Props) {
  const currentUserData = await getCurrentUser();
  if (!currentUserData?.id) {
    return redirect("/");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id: params.chatId,
    },
  });

  if (!otherUser) return redirect("/");

  const conversation = await getOrCreateConversation(
    currentUserData.id,
    otherUser.id
  );

  if (!conversation) {
    return redirect(`/chat`);
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader user={otherUser} />
      <ChatMessages
        apiUrl="/api/messages"
        chatId={conversation.id}
        paramKey={"conversationId"}
        paramValue={conversation.id}
        loggedInUserId={currentUserData.id}
      />
      <div className="mx-2 mt-auto mb-2">
        <ChatInput
          apiUrl={"/api/socket/messages"}
          paramKey={"conversationId"}
          paramValue={conversation?.id}
          name={otherUser.userName}
        />
      </div>
    </div>
  );
}
