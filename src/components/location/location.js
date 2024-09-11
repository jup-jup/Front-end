import { useAtom } from "jotai";
import { useEffect } from "react";
import { updateLocationAtom } from "store/Location";

const { kakao } = window;

// 주소 변환
export const convertAddress = (position) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      position.coords.longitude,
      position.coords.latitude,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const fullAddress = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;
          resolve(fullAddress);
        } else {
          reject("주소 변환 실패");
        }
      }
    );
  });
};

// 현재 위치 위도, 경도 
export const Location = () => {
  const [, updateLocation] = useAtom(updateLocationAtom);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const fullAddress = await convertAddress(position);
          console.log("full", fullAddress);
          updateLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            address: fullAddress,
          });
        } catch (error) {
          console.error("Error converting address:", error);
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  return null;
};
