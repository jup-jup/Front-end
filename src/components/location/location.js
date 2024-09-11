import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

export const coordinatesAtom = atom({ lat: 37.5665, lng: 126.9780 });
export const addressAtom = atom('');

export const useLocation = () => {
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const [address, setAddress] = useAtom(addressAtom);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }, [setCoordinates]);

  return { coordinates, setCoordinates, address, setAddress, getCurrentLocation };
};