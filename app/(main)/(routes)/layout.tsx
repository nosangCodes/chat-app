import ChatSidebar from "@/components/chat/chat-sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="h-full">
      <div className="fixed w-[225px] flex flex-col inset-y-0 h-full">
        <ChatSidebar />
      </div>
      <main className="h-full ml-[225px]">{children}</main>
    </div>
  );
}
