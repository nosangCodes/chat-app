import { useSocket } from "@/components/providers/sokcet-provider";
import { MessageWithUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
  queryKey: string;
  addKey: string;
  updateKey: string;
};

export const useChatSokcet = ({
  queryKey,
  addKey,
  updateKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on(addKey, (message: MessageWithUser) => {
      console.log("on add key", message);
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                items: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
    };
  }, [addKey, queryClient, queryKey, socket]);
};
