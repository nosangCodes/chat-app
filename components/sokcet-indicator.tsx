"use client";

import { useSocket } from "./providers/sokcet-provider";
import { Badge } from "@/components/ui/badge";

type Props = {};

export default function SocketIndicator({}: Props) {
  const { isConnected } = useSocket();
  if (!isConnected)
    return (
      <div>
        <Badge variant={"destructive"}>Polling every 1s</Badge>
      </div>
    );
  return <Badge variant={"green"}>Live</Badge>;
}
