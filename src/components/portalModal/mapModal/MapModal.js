import React, { useCallback, useEffect, useRef, useState } from "react";
import ModalFrame from "../ModalFrame";
import s from "./mapModal.module.scss";

const MapModal = ({ setOnModal, setAddress }) => {
  const [kakao, setKakao] = useState(null);
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const infowindowRef = useRef(null);

  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f167408a014dd101fa1012319a829f76&libraries=services&autoload=false";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setKakao(window.kakao);
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCenter = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setCenter(newCenter);
          setPosition(newCenter);
        },
        (err) => {
          console.error("Error getting position:", err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  const initializeMap = useCallback(() => {
    if (!kakao || !mapRef.current) return;

    const options = {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 3,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    mapInstanceRef.current = map;

    const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    markerRef.current = marker;

    const geocoder = new kakao.maps.services.Geocoder();
    updateAddress(position.lat, position.lng, geocoder, map, kakao);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      updateAddress(latlng.getLat(), latlng.getLng(), geocoder, map, kakao);
    });

    const ps = new kakao.maps.services.Places();
    const searchInput = searchInputRef.current;

    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          ps.keywordSearch(searchInput.value, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const bounds = new kakao.maps.LatLngBounds();
              for (let i = 0; i < data.length; i++) {
                displayMarker(data[i], map, geocoder, kakao);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }
              map.setBounds(bounds);
            }
          });
        }
      });
    }
  }, [kakao, center, position]);

  function displayMarker(place, map, geocoder, kakao) {
    const position = new kakao.maps.LatLng(place.y, place.x);
    if (markerRef.current) {
      markerRef.current.setPosition(position);
    } else {
      markerRef.current = new kakao.maps.Marker({
        position: position,
        map: map,
      });
    }
    map.setCenter(position);
    updateAddress(place.y, place.x, geocoder, map, kakao);
  }

  function updateAddress(lat, lng, geocoder, map, kakao) {
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let fullAddress = "";
        if (result[0].road_address) {
          fullAddress = result[0].road_address.address_name;
        } else {
          fullAddress = result[0].address.address_name;
        }

        if (result[0].road_address && result[0].road_address.building_name) {
          fullAddress += ` (${result[0].road_address.building_name})`;
        }

        setLocation(fullAddress);

        if (infowindowRef.current) {
          infowindowRef.current.close();
        }

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${fullAddress}</div>`,
        });
        infowindow.open(map, markerRef.current);

        infowindowRef.current = infowindow;
      }
    });
  }

  useEffect(() => {
    // if (showMap && kakao) {
    initializeMap();
    // }
  }, [kakao, initializeMap]);

    const handleConfirmLocation = () => {
      if (location) {
        setAddress(location);
      }
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
          {location && (
            <p className="mt-2 text-sm text-gray-500">
              선택된 주소: {location}
            </p>
          )}
        </div>
        <div className="items-center px-4 py-3">
          <button
            onClick={handleConfirmLocation}
            // onClick={() => setAddress('주소')}
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
