import { User } from "@prisma/client";

type Props = {
  user: User;
};

export default function ChatHeader({ user }: Props) {
  return (
    <div className="group h-[50.5px] p-4 py-6 bg-zinc-200 dark:bg-zinc-800 flex items-center">
      <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
        {`${user.firstName} ${user.lastName}`}{" "}
        <span className=" ml-2 text-base text-zinc-600 dark:text-zinc-200 font-medium">
          ({user.userName})
        </span>{" "}
      </h2>
    </div>
  );
}
