import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversation) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [params?.conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
