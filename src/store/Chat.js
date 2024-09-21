import { atom } from "jotai";

export const ChatAtom = atom([]);

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

// export const selectedGiveawayIdAtom = atom(null);
