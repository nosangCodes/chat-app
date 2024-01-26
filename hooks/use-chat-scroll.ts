import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topdiv = chatRef?.current;

    const handleScroll = () => {
      const scrollTop = topdiv?.scrollTop;
      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topdiv?.addEventListener("scroll", handleScroll);

    return () => {
      topdiv?.removeEventListener("scroll", handleScroll);
    };
  }, [chatRef, loadMore, shouldLoadMore]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef?.current;

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }
      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 200;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomDiv?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, hasInitialized, count]);
};
