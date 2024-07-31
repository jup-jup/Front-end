import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PhotoIcon, CameraIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid';

function ChatApp() {
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

  const currentUser = {
    id: 'user1',
    name: '나',
    avatar: 'https://via.placeholder.com/40'
  };

  const otherUser = {
    id: 'user2',
    name: '상대방',
    avatar: 'https://via.placeholder.com/40'
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f167408a014dd101fa1012319a829f76&libraries=services&autoload=false';
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
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: currentUser
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      setTimeout(() => {
        const replyMessage = {
          id: Date.now() + 1,
          text: '안녕하세요! 메시지 잘 받았습니다.',
          sender: otherUser
        };
        setMessages(prevMessages => [...prevMessages, replyMessage]);
      }, 1000);
    }
  };

  const initializeMap = useCallback(() => {
    if (!kakao || !mapRef.current) return;

    // if (!mapInstanceRef.current) {
    //   mapInstanceRef.current = new kakao.maps.Map(mapRef.current, {
    //     center: new kakao.maps.LatLng(37.566826, 126.9786567),
    //     level: 3
    //   });
    // }

    if (mapInstanceRef.current) {
      // mapInstanceRef.current.destroy();
      mapInstanceRef.current = null;
    }

    mapInstanceRef.current = new kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    });

    const geocoder = new kakao.maps.services.Geocoder();

    if (navigator.geolocationm) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPos = new kakao.maps.LatLng(lat, lng);
          mapInstanceRef.current.setCenter(currentPos);

          if (!markerRef.current) {
            markerRef.current = new kakao.maps.Marker({
              position: currentPos,
              map: mapInstanceRef.current
            });
          } else {
            markerRef.current.setPosition(currentPos);
          }

          updateAddress(lat, lng, geocoder, mapInstanceRef.current, kakao);
        },
        (error) => {
          console.error("Error: " + error.message);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }

    kakao.maps.event.addListener(mapInstanceRef.current, 'click', function(mouseEvent) {
      const latlng = mouseEvent.latLng;
      if (markerRef.current) {
        markerRef.current.setPosition(latlng);
      } else {
        markerRef.current = new kakao.maps.Marker({
          position: latlng,
          map: mapInstanceRef.current
        });
      }
      updateAddress(latlng.getLat(), latlng.getLng(), geocoder, mapInstanceRef.current, kakao);
    });

    const ps = new kakao.maps.services.Places();
    const searchInput = searchInputRef.current;

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        ps.keywordSearch(searchInput.value, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i], mapInstanceRef.current, geocoder, kakao);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            mapInstanceRef.current.setBounds(bounds);
          }
        });
      }
    });

  }, [kakao]);

  function displayMarker(place, map, geocoder, kakao) {
    const position = new kakao.maps.LatLng(place.y, place.x);
    if (markerRef.current) {
      markerRef.current.setPosition(position);
    } else {
      markerRef.current = new kakao.maps.Marker({
        position: position,
        map: map
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

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${fullAddress}</div>`
        });
        infowindow.open(map, markerRef.current);
      }
    });
  }

  useEffect(() => {
    if (showMap && kakao) {
      initializeMap();
    }
  }, [showMap, kakao, initializeMap]);

  useEffect(() => {
    if (kakao) {
      initializeMap();
    }
  }, [kakao, initializeMap]);

  const handleMapButtonClick = () => {
    setShowMap(true);
    // 지도를 표시한 후 약간의 지연을 두고 초기화
    setTimeout(() => {
      initializeMap();
    }, 100);
  };

  const handleConfirmLocation = () => {
    if (location) {
      const locationMessage = {
        id: Date.now(),
        text: `선택한 위치: ${location}`,
        sender: currentUser
      };
      setMessages(prevMessages => [...prevMessages, locationMessage]);
    }
    setShowMap(false);
  };

  return (
    <div className='mx-auto max-w-7xl'>
      <div className='flex mb-12'>
        <img className='w-20' src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="Header" />
        <div className='ml-2'>
          <p>제목제목</p>
          <p>설명설명</p>
        </div>
      </div>
      <div className='flex mb-4'>
        <img src={'https://via.placeholder.com/40'} className="w-10 h-10 rounded-full mr-3" alt="User avatar" />
        <p>글올린 사람 닉네임</p>
      </div>
      <div className="flex flex-col h-[40rem] w-[30rem] bg-gray-100">
        <div className="flex-1" />
        <div 
          ref={chatContainerRef}
          className="overflow-y-auto p-4"
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
              {message.sender.id !== currentUser.id && (
                <img src={message.sender.avatar} alt={message.sender.name} className="w-10 h-10 rounded-full mr-3" />
              )}
              <div className={`max-w-xs ${message.sender.id === currentUser.id ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg p-3 shadow`}>
                {message.sender.id !== currentUser.id && (
                  <div className="font-bold mb-1">{message.sender.name}</div>
                )}
                <div>{message.text}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="메시지를 입력하세요..."
          />
        </form>
        <div className="flex justify-around">
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <PhotoIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <CameraIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button 
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            onClick={handleMapButtonClick}
            disabled={!kakao}
          >
            <MapPinIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <CalendarIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      {showMap && kakao && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">위치 선택</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="위치 검색..."
                />
                <div ref={mapRef} style={{width: '100%', height: '400px'}} className="mt-3"></div>
                {location && (
                  <p className="mt-2 text-sm text-gray-500">선택된 주소: {location}</p>
                )}
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleConfirmLocation}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                >
                  확인
                </button>
                <button
                  onClick={() => setShowMap(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
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

export default ChatApp;