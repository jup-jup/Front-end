import { atom } from "jotai";

export const UserDataAtom = atom({
  userName: "",
  userId: "",
});

export const userAtom = atom(
  (get) => get(UserDataAtom),
  (get, set, newUserData) => {
    const currentUserData = get(UserDataAtom);

    set(UserDataAtom, {
      ...currentUserData,
      userName: newUserData.userName || currentUserData.userName,
      userId: newUserData.userId || currentUserData.userId,
    });
  }
);
