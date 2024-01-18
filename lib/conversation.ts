import { string } from "zod";
import { db } from "./db";
import { ConversationWithUsers } from "@/types";

export const getOrCreateConversation = async (
  userOneId: string,
  userTwoId: string
) => {
  try {
    let conversation =
      (await findConversation(userOneId, userTwoId)) ||
      (await findConversation(userTwoId, userOneId));

    if (!conversation) {
      conversation = await createConversation(userOneId, userTwoId);
    }

    return conversation;
  } catch (error) {
    console.log(error);
  }
};

export const findConversation = async (
  userOneId: string,
  userTwoId: string
) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [
          {
            userOneId: userOneId,
            userTwoId: userTwoId,
          },
        ],
      },
      include: {
        userOne: true,
        UserTwo: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createConversation = async (
  userOneId: string,
  userTwoId: string
) => {
  try {
    return await db.conversation.create({
      data: {
        userOneId,
        userTwoId,
      },
      include: {
        userOne: true,
        UserTwo: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
