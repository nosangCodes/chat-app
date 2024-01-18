import { Conversation, User, Message } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

type EmailAddress = {
  email_address: string;
  id: string;
  linked_to: LinkedTo[];
  object: string;
  reserved: boolean;
  verification: {
    status: string;
    attempts: null;
    strategy: string;
    expire_at: null;
  };
};

type LinkedTo = Record<string, never>; // Assuming linked_to has no properties in this example

type ExternalAccount = Record<string, never>; // Define properties for ExternalAccount as needed

// type User = {
//   birthday: string;
//   created_at: number;
//   email_addresses: EmailAddress[];
//   external_accounts: ExternalAccount[];
//   external_id: null;
//   first_name: string;
//   gender: string;
//   id: string;
//   image_url: string;
//   last_name: string;
//   last_sign_in_at: null;
//   object: string;
//   password_enabled: boolean;
//   phone_numbers: any[]; // Update this with the actual type if known
//   primary_email_address_id: string;
//   primary_phone_number_id: null;
//   primary_web3_wallet_id: null;
//   private_metadata: Record<string, any>;
//   profile_image_url: string;
//   public_metadata: Record<string, any>;
//   two_factor_enabled: boolean;
//   unsafe_metadata: Record<string, any>;
//   updated_at: number;
//   username: string;
//   web3_wallets: any[]; // Update this with the actual type if known
// };

// we are going to create a custom response type for socketresponse
type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NextServer & {
      io: SocketIOServer;
    };
  };
};

type ConversationWithUsers = Conversation & {
  userOne: User;
  userTwo: User;
};

type MessageWithUser = Message & {
  user: User;
};
