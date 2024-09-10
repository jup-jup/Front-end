/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  PhotoIcon,
  CameraIcon,
  MapPinIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import MapModal from "components/portalModal/mapModal/MapModal";
import Chat from "components/chat/Chat";
import ChatList from "components/chat/ChatList";
import axios from "axios";
import instance from "api/axios";

export default function ChatOtherDetail() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [address, setAddress] = useState("");
  const [upText, setUpText] = useState([{}]);
  const [roomId, setRoomId] = useState();

  const [showMap, setShowMap] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    instance
      .post("https://jupjup.store/api/v1/chat-rooms", {
        giveaway_id: id,
      })
      .then((res) => {
        setRoomId(res.data.room_id);
        console.log("채팅방 생성", res.data.room_id);
      });
  }, []);

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex mb-12">
        <img
          className="w-20"
          src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
          alt="Header"
        />
        <div className="ml-2">
          <p>제목제목</p>
          <p>설명설명</p>
        </div>
      </div>
      <div className="flex mb-4">
        <img
          src={"https://via.placeholder.com/40"}
          className="w-10 h-10 mr-3 rounded-full"
          alt="User avatar"
        />
        <p>채팅걸어오신 분의 닉네임</p>
      </div>
      <div className="flex flex-col h-[40rem] w-[30rem] bg-gray-100">
        {/* 채팅 */}
        {roomId && (
          <>
            <ChatList postId={roomId} upText={upText} />
            <Chat postId={roomId} setUpText={setUpText} upText={upText} />
          </>
        )}

        <div className="flex justify-around">
          <button className="p-2 transition bg-gray-200 rounded-full hover:bg-gray-300">
            <PhotoIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 transition bg-gray-200 rounded-full hover:bg-gray-300">
            <CameraIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button
            className="p-2 transition bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={handleMapButtonClick}
            // disabled={!kakao}
          >
            <MapPinIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 transition bg-gray-200 rounded-full hover:bg-gray-300">
            <CalendarIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      <button className="float-right p-2 mt-4 mb-20 text-white transition bg-indigo-500 rounded-full hover:bg-gray-300">
        거래 완료
      </button>
      {showMap && (
        <MapModal
          setOnModal={() => setShowMap()}
          setAddress={setAddress}
          isDim
        />
      )}
    </div>
  );
}
