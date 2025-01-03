import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatInput from "./ChatInput";
import { useAtom } from "jotai";
import { updateChatAtom } from "store/Chat";
import { getCookie } from "util/authCookie";
import Spinner from "components/spinner/Spinner";

const Chat = ({ postId, upText, setUpText }) => {
  const [, updateChat] = useAtom(updateChatAtom);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);

  const headers = {
    Authorization: `Bearer ${getCookie("jup-jup-atk")}`,
  };

  console.log("챗 아이디", postId);

  // 소켓 연결 설정
  useEffect(() => {
    const socket = new SockJS(`https://jupjup.store/ws`);
    stompClient.current = Stomp.over(socket);

    setIsLoading(true);
    // STOMP 클라이언트 연결
    stompClient.current.connect(headers, (frame) => {
      console.log("Connected to WebSocket, Frame:", frame);
      setIsLoading(false);
      // 방 구독
      stompClient.current.subscribe(
        `/sub/room/${postId}`,
        (message) => {
          const parsedMessage = JSON.parse(message.body);
          console.log("메시지 받음: ", parsedMessage);
          // setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          const newChat = {
            user_id: parsedMessage.user_id,
            content: parsedMessage.content,
            created_at: parsedMessage.created_at,
          };
          updateChat(newChat);
        },
        headers
      );
    });

    // 컴포넌트가 언마운트될 때 연결 해제
    return () => {
      if (stompClient.current) {
        setIsLoading(true);
        socket.close();
        stompClient.current.disconnect(() => {
          console.log("WebSocket 연결 해제");
          setIsLoading(false);
        });
      }
    };
  }, [postId]);

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중 표시
  }

  const sendMessage = (e, text) => {
    e.preventDefault();
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        `/pub/room/${postId}/chat`,
        {
          Authorization: `Bearer ${getCookie("jup-jup-atk")}`,
        },
        JSON.stringify({ content: text })
      );
      console.log("메시지 전송: ", text);
    } else {
      console.error("STOMP 클라이언트가 연결되지 않았습니다.");
    }
  };

  return (
    <div>
      <ChatInput setText={setText} onClick={sendMessage} text={text} />
      {/* <div>
        <h3>메시지 목록</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Chat;
