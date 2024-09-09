import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { dayChat } from "util/day";
import "./chat.scss";
import { userAuth } from "hooks/useAuth";

const ChatList = ({ postId, upText, otherUserId }) => {
  const message = {
    data: [
      {
        createDate: "2024-09-09T11:58:08.822233",
        message: "비밀대화",
      },
      {
        createDate: "2024-09-09T11:58:08.822233",
        message: "https://example.com/image2.jpg",
      },
      {
        createDate: "2024-09-09T11:58:08.822233",
        message: "https://example.com/image3.jpg",
      },
    ],
  };
  const scroll = useRef();
  const { userId: myid } = userAuth(localStorage.getItem("accessToken"));

  const [dataPage, setDataPage] = useState(0);
  const [dataSize, setDataSize] = useState(20);
  const [atBottom, setAtBottom] = useState(false);
  console.log("토큰 ", myid);

  async function getChatList() {
    const { data } = await axios.get(`https://jupjup.store/api//chats`, {
      params: { page: dataPage, size: dataSize },
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": "토큰",
      },
    });
    return data;
  }

  // TODO: 첫 채팅 리스트 받아오기
  // const { data, isLoading, refetch, isSuccess } = useQuery({
  //   queryKey: ["chatList", dataPage, dataSize],
  //   queryFn: getChatList,
  // });

  // const reversedList = data && [...data.content].reverse();

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
    }, 500);
    setAtBottom(true);
  }, []);

  // data && isSuccess && scrollToBottom();

  // console.log("cc", isSuccess && data, reversedList);

  useEffect(() => {
    scrollToBottom();
  }, [message.data]);

  return (
    <>
      <div className="chat_wrap" ref={scroll} onWheel={(e) => handleScroll(e)}>
        <div className="chat_list">
          {/* {isLoading && "로딩중.."} */}
          {/* 이전 대화리스트 */}
          {/* {data &&
            isSuccess &&
            reversedList.map((item, i) => (
              <div
                key={i}
                className={classNames("chat-item", {
                  "is-my": nickname === item.sender,
                })}
              >
                {nickname === item.sender ? (
                  <>
                    <span className="createDate">{dayChat(item.createDate)}</span>
                    <span className="message">{lineConverter(item.message)}</span>
                  </>
                ) : (
                  <>
                    <span className="sender">{item.sender}</span>
                    <span className="message">{lineConverter(item.message)}</span>
                    <span className="createDate">{dayChat(item.createDate)}</span>
                  </>
                )}
              </div>
            ))} */}
          {/* 추가된 대화리스트 */}
          {message?.data.map(
            (item, i) =>
              i !== 0 && (
                <div
                  key={i}
                  className={classNames("chat-item", {
                    "is-my": otherUserId !== myid,
                  })}
                >
                  {otherUserId !== myid ? (
                    <>
                      <span className="createDate">
                        {dayChat(item.createDate)}
                      </span>
                      <span className="message">{item.message}</span>
                    </>
                  ) : (
                    <>
                      <span className="message">{item.message}</span>
                      <span className="createDate">
                        {dayChat(item.createDate)}
                      </span>
                    </>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default ChatList;
