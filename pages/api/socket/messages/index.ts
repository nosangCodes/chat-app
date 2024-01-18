import { getCurrentUser } from "@/lib/current-user-server";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message: content } = await req.body;
    const { conversationId } = req.query;
    const user = await getCurrentUser(req);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!content) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID is required" });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId as string,
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // create message
    const message = await db.message.create({
      data: {
        content,
        conversationId: conversation.id,
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    const chatKey = `chat:${conversation.id}:messages`;
    res?.socket?.server?.io.emit(chatKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
