import { atom } from "jotai";

// 채팅에서 서로간 대화 목록 임시저장하는 곳
export const ChatAtom = atom([]);
// 첫 로그인시 채팅 목록 임시 저장,
// 게시글 상세-> 채팅방 입장시 이미 있는 채팅방일 경우 채팅방으로 다이렉트 입장하는 용도
export const chatList = atom([]);

export const updateChatAtom = atom(
  (get) => get(ChatAtom),
  (get, set, action) => {
    if (action === "reset") {
      set(ChatAtom, []);
    } else {
      const currentChats = get(ChatAtom);
      set(ChatAtom, [...currentChats, action]);
    }
  }
);

export const getChatListAtom = atom(
  (get) => get(chatList),
  (get, set, action) => {
    const currentChats = get(chatList);
    set(chatList, ...currentChats, action);
  }
);

// export const selectedGiveawayIdAtom = atom(null);
