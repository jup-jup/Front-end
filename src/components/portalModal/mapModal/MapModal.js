import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalFrame from "../ModalFrame";
import s from "./mapModal.module.scss";
import { useLocation, addressAtom } from 'components/location/location';
import { useAtom } from 'jotai';

const MapModal = ({ setOnModal }) => {
  const { coordinates, setCoordinates, getCurrentLocation, kakaoLoaded } = useLocation();
  const [address, setAddress] = useAtom(addressAtom);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const infowindowRef = useRef(null);

  useEffect(() => {
    if (!isMapInitialized && kakaoLoaded) {
      getCurrentLocation();
      setIsMapInitialized(true);
    }
  }, [getCurrentLocation, isMapInitialized, kakaoLoaded]);

  const updateMarkerAndAddress = useCallback((lat, lng, map, updateCoordinates = false) => {
    const position = new window.kakao.maps.LatLng(lat, lng);
    
    if (!markerRef.current) {
      markerRef.current = new window.kakao.maps.Marker({
        position: position,
        map: map
      });
    } else {
      markerRef.current.setPosition(position);
      markerRef.current.setMap(map);
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let fullAddress = result[0].road_address 
          ? result[0].road_address.address_name 
          : result[0].address.address_name;
        
        if (result[0].road_address && result[0].road_address.building_name) {
          fullAddress += ` (${result[0].road_address.building_name})`;
        }

        setAddress(fullAddress);
        
        if (updateCoordinates) {
          setCoordinates({ lat, lng });
        }

        if (infowindowRef.current) {
          infowindowRef.current.close();
        }

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${fullAddress}</div>`,
        });
        infowindow.open(map, markerRef.current);

        infowindowRef.current = infowindow;
      }
    });
  }, [setAddress, setCoordinates]);

  const initializeMap = useCallback(() => {
    if (!window.kakao || !mapRef.current || !coordinates.lat || !coordinates.lng) return;

    const options = {
      center: new window.kakao.maps.LatLng(coordinates.lat, coordinates.lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
    mapInstanceRef.current = map;

    updateMarkerAndAddress(coordinates.lat, coordinates.lng, map);

    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      updateMarkerAndAddress(latlng.getLat(), latlng.getLng(), map, true);
    });

    const ps = new window.kakao.maps.services.Places();
    const searchInput = searchInputRef.current;

    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          ps.keywordSearch(searchInput.value, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const bounds = new window.kakao.maps.LatLngBounds();
              for (let i = 0; i < data.length; i++) {
                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
              }
              map.setBounds(bounds);
              updateMarkerAndAddress(data[0].y, data[0].x, map, true);
            }
          });
        }
      });
    }
  }, [coordinates, updateMarkerAndAddress]);

  useEffect(() => {
    if (isMapInitialized && kakaoLoaded) {
      initializeMap();
    }
  }, [initializeMap, isMapInitialized, kakaoLoaded]);

  const handleConfirmLocation = () => {
    setOnModal(false);
  };

  return (
    <ModalFrame setOnModal={setOnModal} isDim className={s.map_modal}>
      <div className="mt-3 text-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          위치 선택
        </h3>
        <div className="py-3 mt-2 px-7">
          <input
            ref={searchInputRef}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="위치 검색..."
          />
          <div
            ref={mapRef}
            style={{ width: "100%", height: "400px" }}
            className="mt-3"
          ></div>
          {address && (
            <p className="mt-2 text-sm text-gray-500">
              선택된 주소: {address}
            </p>
          )}
        </div>
        <div className="items-center px-4 py-3">
          <button
            onClick={handleConfirmLocation}
            className="w-full px-4 py-2 mb-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            확인
          </button>
          <button
            onClick={() => setOnModal(false)}
            className="w-full px-4 py-2 text-base font-medium text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            취소
          </button>
        </div>
      </div>
    </ModalFrame>
  );
};

export default MapModal;