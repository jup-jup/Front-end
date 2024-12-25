/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  PhotoIcon,
  CameraIcon,
  MapPinIcon,
  CalendarIcon,
} from '@heroicons/react/24/solid';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [location, setLocation] = useState(null);
  const [kakao, setKakao] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const chatContainerRef = useRef(null);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const infowindowRef = useRef(null);

  // 지도의 중심좌표
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  // 현재 위치
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  const currentUser = {
    id: 'user1',
    name: '나',
    avatar: 'https://via.placeholder.com/40',
  };

  const otherUser = {
    id: 'user2',
    name: '상대방',
    avatar: 'https://via.placeholder.com/40',
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=f167408a014dd101fa1012319a829f76&libraries=services&autoload=false';
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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log('Geolocation effect running');

    if (navigator.geolocation) {
      console.log('Geolocation is supported');

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log('Position acquired', pos);
          const newCenter = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setCenter(newCenter);
          setPosition(newCenter);
        },
        (err) => {
          console.error('Error getting position:', err);
          // 에러 발생 시 기본 위치 설정
          const defaultPosition = { lat: 33.450701, lng: 126.570667 };
          setCenter(defaultPosition);
          setPosition(defaultPosition);
        },
        options
      );

      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          console.log('Position updated', pos);
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.error('Error watching position:', err);
        },
        options
      );

      return () => {
        console.log('Clearing geolocation watch');
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log('Geolocation is not supported');
      // 지오로케이션이 지원되지 않는 경우 기본 위치 설정
      const defaultPosition = { lat: 33.450701, lng: 126.570667 };
      setCenter(defaultPosition);
      setPosition(defaultPosition);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: currentUser,
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      setTimeout(() => {
        const replyMessage = {
          id: Date.now() + 1,
          text: '안녕하세요! 메시지 잘 받았습니다.',
          sender: otherUser,
        };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1000);
    }
  };

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

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      updateAddress(latlng.getLat(), latlng.getLng(), geocoder, map, kakao);
    });

    const ps = new kakao.maps.services.Places();
    const searchInput = searchInputRef.current;

    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
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
        let fullAddress = '';
        if (result[0].road_address) {
          fullAddress = result[0].road_address.address_name;
        } else {
          fullAddress = result[0].address.address_name;
        }

        if (result[0].road_address && result[0].road_address.building_name) {
          fullAddress += ` (${result[0].road_address.building_name})`;
        }

        setLocation(fullAddress);

        // 기존 infowindow가 있다면 닫기
        if (infowindowRef.current) {
          infowindowRef.current.close();
        }

        // 새로운 infowindow 생성 및 열기
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${fullAddress}</div>`,
        });
        infowindow.open(map, markerRef.current);

        // infowindow 참조 업데이트
        infowindowRef.current = infowindow;
      }
    });
  }

  useEffect(() => {
    if (showMap && kakao) {
      initializeMap();
    }
  }, [showMap, kakao, initializeMap]);

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const handleConfirmLocation = () => {
    if (location) {
      const locationMessage = {
        id: Date.now(),
        text: `선택한 위치: ${location}`,
        sender: currentUser,
      };
      setMessages((prevMessages) => [...prevMessages, locationMessage]);
    }
    setShowMap(false);
  };

  return (
    <div className='mx-auto max-w-7xl'>
      <div className='flex mb-12'>
        <img
          className='w-20'
          src='https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
          alt='Header'
        />
        <div className='ml-2'>
          <p>제목제목</p>
          <p>설명설명</p>
        </div>
      </div>
      <div className='flex mb-4'>
        <img
          src={'https://via.placeholder.com/40'}
          className='w-10 h-10 mr-3 rounded-full'
          alt='User avatar'
        />
        <p>글올린 사람 닉네임</p>
      </div>
      <div className='flex flex-col h-[40rem] w-[30rem] bg-gray-100'>
        <div className='flex-1' />
        <div ref={chatContainerRef} className='p-4 overflow-y-auto'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender.id === currentUser.id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {message.sender.id !== currentUser.id && (
                <img
                  src={message.sender.avatar}
                  alt={message.sender.name}
                  className='w-10 h-10 mr-3 rounded-full'
                />
              )}
              <div
                className={`max-w-xs ${
                  message.sender.id === currentUser.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                } rounded-lg p-3 shadow`}
              >
                {message.sender.id !== currentUser.id && (
                  <div className='mb-1 font-bold'>{message.sender.name}</div>
                )}
                <div>{message.text}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='p-4 bg-white'>
          <input
            type='text'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='메시지를 입력하세요...'
          />
        </form>
        <div className='flex justify-around'>
          <button className='p-2 transition bg-gray-200 rounded-full hover:bg-gray-300'>
            <PhotoIcon className='w-6 h-6 text-gray-600' />
          </button>
          <button className='p-2 transition bg-gray-200 rounded-full hover:bg-gray-300'>
            <CameraIcon className='w-6 h-6 text-gray-600' />
          </button>
          <button
            className='p-2 transition bg-gray-200 rounded-full hover:bg-gray-300'
            onClick={handleMapButtonClick}
            disabled={!kakao}
          >
            <MapPinIcon className='w-6 h-6 text-gray-600' />
          </button>
          <button className='p-2 transition bg-gray-200 rounded-full hover:bg-gray-300'>
            <CalendarIcon className='w-6 h-6 text-gray-600' />
          </button>
        </div>
      </div>
      {showMap && kakao && (
        <div className='fixed inset-0 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50'>
          <div className='relative p-5 mx-auto bg-white border rounded-md shadow-lg top-20 w-96'>
            <div className='mt-3 text-center'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                위치 선택
              </h3>
              <div className='py-3 mt-2 px-7'>
                <input
                  ref={searchInputRef}
                  type='text'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='위치 검색...'
                />
                <div
                  ref={mapRef}
                  style={{ width: '100%', height: '400px' }}
                  className='mt-3'
                ></div>
                {location && (
                  <p className='mt-2 text-sm text-gray-500'>
                    선택된 주소: {location}
                  </p>
                )}
              </div>
              <div className='items-center px-4 py-3'>
                <button
                  onClick={handleConfirmLocation}
                  className='w-full px-4 py-2 mb-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
                >
                  확인
                </button>
                <button
                  onClick={() => setShowMap(false)}
                  className='w-full px-4 py-2 text-base font-medium text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300'
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
