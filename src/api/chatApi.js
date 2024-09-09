import instance from "./axios";

// 채팅 관련 API 엔드포인트
export async function getChatListApi() {
  const res = await instance.get(
    `${process.env.REACT_APP_API_URL}/v1/chat-rooms`
  );
  return res.data;
}