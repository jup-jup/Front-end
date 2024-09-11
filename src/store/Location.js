import { atom } from "jotai";

export const LocationAtom = atom({
  location: {
    lat: 0,
    lon: 0,
  },
  address: "",
});

export const updateLocationAtom = atom(
  (get) => get(LocationAtom),
  (get, set, location) => {
    // 상태 업데이트 기능
    const currentLocation = get(LocationAtom);
    set(LocationAtom, {
      ...currentLocation,
      location: {
        lat: location.lat,
        lon: location.lon,
      },
      address: location.address,
    });
  }
);
