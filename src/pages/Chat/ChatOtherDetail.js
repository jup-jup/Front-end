/* eslint-disable react-hooks/exhaustive-deps */
import instance from "api/axios";
import Chat from "components/chat/Chat";
import ChatList from "components/chat/ChatList";
import MapModal from "components/portalModal/mapModal/MapModal";
import { useGetSharingId } from "hooks/useSharingApi";
import { useSuccessUpdate } from "hooks/useMyPageApi";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import Gravatar from "react-gravatar";
import { useLocation, useParams } from "react-router-dom";
import { getChatListAtom, updateChatAtom } from "store/Chat";
import { userAtom } from "store/User";
import s from "./chat.module.scss";

export default function ChatOtherDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [address, setAddress] = useState("");
  const [upText, setUpText] = useState([{}]);
  const [roomId, setRoomId] = useState();
  const [, updateChat] = useAtom(updateChatAtom);
  const getChatList = useAtom(getChatListAtom);
  const [userId] = useAtom(userAtom);

  const [showMap, setShowMap] = useState(false);
  const chatContainerRef = useRef(null);
  const [giveaway, setGiveWay] = useState(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log("받은거 : ", location?.state?.giveaway_id);
    // 없던 채팅방을 요청할때 새로운 채팅방 생성
    if (location.state.type === "new") {
      instance
        .post("https://jupjup.store/api/v1/chat-rooms", {
          giveaway_id: id,
        })
        .then((res) => {
          setRoomId(res.data.room_id);
          console.log("채팅방 생성", res.data.room_id);
        });
    } else {
      // 이미 있는 채팅방이면 게시글 id만 전송
      console.log(
        "cc11",
        getChatList[0].find(
          (item) => item.giveaway_id == location?.state?.giveaway_id
        )?.id
      );
      const roomindex = getChatList[0].find(
        (item) => item.giveaway_id == location?.state?.giveaway_id
      )?.id;
      // setRoomId(getChatList[0].find((item) => item.giveaway_id == id)?.id);
      setRoomId(roomindex);
    }

    return () => {
      updateChat("reset");
    };
  }, []);

  // 지도 검색 모달
  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const { data: postDetail } = useGetSharingId(location?.state?.giveaway_id);
  const updateMutation = useSuccessUpdate();

  useEffect(()=>{
    if (postDetail) setGiveWay(postDetail.data.giveaway_id)
  },[postDetail])

  const sharingSuccess = () => {
    console.log('나눔완료')
    console.log(postDetail, '나눔완료')
    console.log(userId.userId, '나눔완료')

    // 내가 올린 게시글이면
    // if(postDetail.data.giver == userId.userId) { 
    //   userPatchSuccess(userId.userId) 
    // } else {

    const sample = {
      status: 'COMPLETED',
      receiverId: postDetail.data.giver.id,
    };

    // useSuccessUpdate(postDetail.data.giveaway_id, sample) 
    updateMutation.mutate({ id:giveaway, data: sample });

    console.log(giveaway, 'giveaway')
    // }
    
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex mb-12">
        {/* <img
          className="w-20"
          src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
          alt="Header"
        /> */}
        <div className="ml-2">
          <p>{postDetail?.data?.title}</p>
          <p>{postDetail?.data?.description}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {/* <img
          src={"https://via.placeholder.com/40"}
          className="w-10 h-10 mr-3 rounded-full"
          alt="User avatar"
        /> */}
        <Gravatar
          email={`${postDetail?.data?.giver.name}`}
          className="w-10 h-10 mr-3 rounded-full"
        />
        <p>{postDetail?.data?.giver.name}</p>
      </div>
      <div className="flex flex-col h-[40rem] w-[30rem] bg-gray-100">
        {/* 채팅 */}
        {roomId && (
          <div className={s.chat_inner}>
            <ChatList postId={roomId} upText={upText} />
            <Chat postId={roomId} setUpText={setUpText} upText={upText} />
          </div>
        )}

        {/* <div className="flex justify-around">
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
        </div> */}
      </div>
      <button onClick={sharingSuccess} className="float-right p-2 mt-4 mb-20 text-white transition bg-indigo-500 rounded-full hover:bg-gray-300">
        나눔 완료
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
