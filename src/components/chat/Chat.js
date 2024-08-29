import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { INIT_MESSAGE, SEND_MESSAGE } from "store/ChatStore";
import ChatInput from "./ChatInput";

const Chat = ({ postId, upText, setUpText }) => {
  const [text, setText] = useState("");
  const [temps, setTemp] = useState([{}]);

  //socket 연결
  const headers = {
    // "X-AUTH-TOKEN": auth.accessToken,
  };

  const socket = new SockJS(`${process.env.REACT_APP_ROOT_API}`);
  const stomp = new Stomp.over(socket);

  useEffect(() => {
    stomp.connect(headers, ({ temp }) => {
      console.log("소켓 연결됨");
      //방 생성

      //이벤트 구독
      stomp.subscribe(
        `/sub/rooms/${postId}`,
        (body) => {
          console.log("메시지 받음: ", JSON.parse(body.body));
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
        // NOTE: 소켓 끊어질때 store에 있는거 다 제거하기
        // dispatch(INIT_MESSAGE());
      });
    };
  }, []);

  const click = async (e, text) => {
    e.preventDefault();

    stomp.send(
      `/pub/rooms/${postId}`,
      {
        // "X-AUTH-TOKEN": auth.accessToken,
      },
      JSON.stringify(text)
    );
  };

  return (
    <div>
      <ChatInput setText={setText} onClick={click} text={text} />
    </div>
  );
};
export default Chat;
