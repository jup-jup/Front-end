import React, { useEffect, useRef, useState, useCallback } from "react";
import ModalFrame from "../ModalFrame";
import s from "./mapModal.module.scss";
import { useAtom } from "jotai";
import { LocationAtom } from "store/Location";
import { convertAddress } from "components/location/location";

const { kakao } = window;

const MapModal = ({ setOnModal }) => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState(""); // 맵에서 위치 변경시 주소 저장
  const [coordinates, setCoordinates] = useState({ // 맵에서 위치 변경시 위도,경도 저장
    lat: 0,
    lng: 0,
  });
  const [location] = useAtom(LocationAtom);

  const lat = location.location.lat;
  const lon = location.location.lon;

  useEffect(() => {
    if (mapRef.current && location) {
      const options = {
        center:
          coordinates.lat !== 0
            ? new kakao.maps.LatLng(coordinates.lat, coordinates.lng)
            : new kakao.maps.LatLng(
                location.location.lat,
                location.location.lon
              ),
        level: 3,
      };
      const newMap = new kakao.maps.Map(mapRef.current, options);
      setMap(newMap);

      const newMarker = new kakao.maps.Marker({
        position:
          coordinates.lat !== 0
            ? new kakao.maps.LatLng(coordinates.lat, coordinates.lng)
            : new kakao.maps.LatLng(lat, lon),
        map: newMap,
      });
      setMarker(newMarker);

      const geocoder = new kakao.maps.services.Geocoder();

      kakao.maps.event.addListener(newMap, "click", function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        newMarker.setPosition(latlng);
        setCoordinates({ lat: latlng.getLat(), lng: latlng.getLng() });

        geocoder.coord2Address(
          latlng.getLng(),
          latlng.getLat(),
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const fullAddress = result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;
              setAddress(fullAddress);
            }
          }
        );
      });
    }
  }, [coordinates]);

  const handleSearch = useCallback(() => {
    if (map && searchInputRef.current) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(searchInputRef.current.value, async (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
          const newPosition = new kakao.maps.LatLng(data[0].y, data[0].x);
          marker.setPosition(newPosition);
          const position = {
            coords: {
              latitude: data[0].y,
              longitude: data[0].x,
            },
          };
          try {
            const fullAddress = await convertAddress(position);
            setAddress(fullAddress);
          } catch (error) {
            console.error("주소 변환 중 오류 발생:", error);
          }
        }
      });
    }
  }, [map, marker]);

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
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <div
            ref={mapRef}
            style={{ width: "100%", height: "400px" }}
            className="mt-3"
          ></div>
          {address ? (
            <p className="mt-2 text-sm text-gray-500">선택된 주소: {address}</p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              선택된 주소: {location.address}
            </p>
          )}
        </div>
        <div className="items-center px-4 py-3">
          <button
            onClick={() => setOnModal(false)}
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
