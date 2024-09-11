import { atom, useAtom } from 'jotai';
import { useEffect, useCallback } from 'react';

export const coordinatesAtom = atom({ lat: 0, lng: 0 });
export const addressAtom = atom('');
export const kakaoLoadedAtom = atom(false);

const loadKakaoMapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f167408a014dd101fa1012319a829f76&libraries=services&autoload=false';
    script.onload = () => {
      window.kakao.maps.load(() => {
        resolve();
      });
    };
    document.head.appendChild(script);
  });
};

export const useLocation = () => {
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [kakaoLoaded, setKakaoLoaded] = useAtom(kakaoLoadedAtom);

  useEffect(() => {
    loadKakaoMapScript().then(() => setKakaoLoaded(true));
  }, [setKakaoLoaded]);

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newCoordinates);
        },
        (error) => {
          console.error('Error getting current location:', error);
          setCoordinates({ lat: 37.5665, lng: 126.9780 }); // 서울시청 좌표
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setCoordinates({ lat: 37.5665, lng: 126.9780 }); // 서울시청 좌표
    }
  }, [setCoordinates]);

  console.log(address, 'address location:')

  return {
    coordinates,
    setCoordinates,
    address,
    setAddress,
    getCurrentLocation,
    kakaoLoaded,
  };
};