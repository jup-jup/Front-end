import { atom } from "jotai";

export const ChatAtom = atom([]);

export const updateChatAtom = atom(
  (get) => get(ChatAtom),
  (get, set, newChat) => {
    const currentChats = get(ChatAtom);
    set(ChatAtom, [...currentChats, newChat]);
  }
);


export const selectedGiveawayIdAtom = atom(null);