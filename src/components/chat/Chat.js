import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatInput from "./ChatInput";


const Chat = ({ postId, upText, setUpText }) => {
  const [text, setText] = useState("");
  const [temps, setTemp] = useState([{}]);

  //socket 연결
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };

  const socket = new SockJS(`https://jupjup.store/ws`);
  // const socket = new SockJS(`https://localhost:8080/ws`);
  const stomp = new Stomp.over(socket);

  useEffect(() => {
    console.log('소켓 안에 받은 id', postId);
    stomp.connect(headers, ({ temp }) => {
      //방 생성

      //이벤트 구독
      stomp.subscribe(
        `/sub/room/${postId}`,
        (body) => {
          // console.log("메시지 받음: ", JSON.parse(body.body));
          console.log("메시지 받음: ", body);
          // dispatch(SEND_MESSAGE(JSON.parse(body.body)));
        },
        headers
      );
    });
  }, []);

  useEffect(() => {
    return () => {
      //연결 끊기
      stomp.disconnect(() => {
        console.log("socket연결 해제");
      });
    };
  }, []);

  const click = async (e, text) => {
    e.preventDefault();

    stomp.send(
      `/pub/room/${postId}/chat`,
      {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      // JSON.stringify(text) )
      // text)
       JSON.stringify({ content: text }));
      // { content: text });
      // { content: JSON.stringify(text) }); 
  };

  return (
    <div>
      <ChatInput setText={setText} onClick={click} text={text} />
    </div>
  );
};
export default Chat;
