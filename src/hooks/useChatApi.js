import { useQuery } from "@tanstack/react-query";
import { getChatListApi } from "api/chatApi";

// 채팅 목록 불러오기
export const useGetChatList= () => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: getChatListApi,
  });
};
