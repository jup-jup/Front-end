import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { dayChat } from "util/day";
import "./chat.scss";
import { userAuth } from "hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { userAtom } from "store/User";
import { updateChatAtom } from "store/Chat";
import { getCookie } from "util/authCookie";

const ChatList = ({ postId, upText, otherUserId }) => {
  const scroll = useRef();
  const { userId: myid } = userAuth(getCookie("jup-jup-atk"));
  // const [userData] = useAtom(userAtom);
  const [chatList] = useAtom(updateChatAtom);

  const [dataPage, setDataPage] = useState(0);
  const [dataSize, setDataSize] = useState(10);
  const [atBottom, setAtBottom] = useState(false);
  const [newMessage, setNewMessage] = useState({});

  async function getChatList() {
    const { data } = await axios.get(
      `https://jupjup.store/api/v1/chat-rooms/${postId}/chats`,
      {
        params: { page: dataPage, size: dataSize },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("jup-jup-atk")}`,
        },
      }
    );
    return data;
  }

  // TODO: 첫 채팅 리스트 받아오기
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["chatList", dataPage, dataSize],
    queryFn: getChatList,
  });

  const reversedList = data && [...data].reverse();
  
  const lineConverter = (text) => {
    return (
      <>
        {text.split("\\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </>
    );
  };

  const scrollToBottom = () => {
    if (scroll.current) {
      const scrollContainer = scroll.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const handleScroll = (e) => {
    if (scroll.current) {
      const scrollContainer = scroll.current;
      if (scrollContainer.scrollTop === 0 && e.deltaY < 0) {
        // console.log("스크롤이 맨 위에 있습니다.");
        setDataPage((prevCount) => prevCount - 1);
        setDataSize((prevCount) => prevCount + 10);
      } else {
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    setAtBottom(true);
    
  }, []);

  // data && isSuccess && scrollToBottom();

  // console.log("cc", isSuccess && data);

  useEffect(() => {
    scrollToBottom();
  }, [newMessage]);

  return (
    <>
      <div className="chat_wrap" ref={scroll} onWheel={(e) => handleScroll(e)}>
        <div className="chat_list">
          {/* {isLoading && "로딩중.."} */}
          {/* 이전 대화리스트 */}
          {data &&
            isSuccess &&
            reversedList.map((item, i) => (
              <div
                key={i}
                className={classNames("chat-item", {
                  "is-my": myid == item.user_id,
                })}
              >
                {/* 내 아이디 {myid} 
                <br/>
                상대방 아이디 {item.user_id} */}
                {myid === item.user_id ? (
                  <>
                    <span className="createDate">
                      {dayChat(item.created_at)}
                      {/* {typeof myid} */}
                    </span>
                    <span className="message">
                      {lineConverter(item.content)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="message">
                      {lineConverter(item.content)}
                      {/* {typeof item.user_id} */}
                    </span>
                    <span className="createDate">
                      {dayChat(item.created_at)}
                    </span>
                  </>
                )}
              </div>
            ))}
          {/* 추가된 대화리스트 */}
          {chatList.map((item, i) => (
            <div
              key={i}
              className={classNames("chat-item", {
                "is-my": myid == item.user_id,
              })}
            >
              {myid === item.user_id ? (
                <>
                  <span className="createDate">{dayChat(item.created_at)}</span>
                  <span className="message">{item.content}</span>
                </>
              ) : (
                <>
                  <span className="message">{item.content}</span>
                  <span className="createDate">{dayChat(item.created_at)}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;
