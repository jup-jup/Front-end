import { useGetChatList } from "hooks/useChatApi";
import Gravatar from "react-gravatar";
import { Link, useLocation } from "react-router-dom";
import { getRelativeTime } from "util/day";
import s from "./chat.module.scss";
import { useAtom } from "jotai";
import { userAtom } from "store/User";
// import { selectedGiveawayIdAtom } from 'store/Chat';
import { useEffect, useState, useCallback } from "react";

export default function ChatOtherList() {
  const [user] = useAtom(userAtom);
  // const [selectedGiveawayId] = useAtom(selectedGiveawayIdAtom);
  const location = useLocation();
  const giveawayId = location.state?.giveawayId;

  const [filteredData, setFilteredData] = useState([]);
  const { data, isLoading, refetch } = useGetChatList();

  useEffect(() => {
    if (giveawayId == "header") {
      setFilteredData(data);
    } else {
      const newFilteredData = giveawayId
        ? data.filter((item) => item.giveaway_id === giveawayId)
        : data;
      setFilteredData(newFilteredData);
    }
  }, [data, giveawayId]);

  const OtherUser = (data) => {
    const nameFilter = data.map((item) =>
      item.joined_users.filter((item) => item.name !== user.userName)
    );
    return nameFilter;
  };

  if (isLoading) return <div>로딩중 ...</div>;

  const renderChatList = (chatData) => (
    <ul className={s.chat_list}>
      {chatData.length > 0 ? (
        chatData.map((item, index) => (
          <li key={index}>
            <Link
              to={`/chatOtherDetail/${item.id}`}
              className={s.item}
              state={{ type: "old" }}
            >
              <div className={s.profile}>
                <Gravatar
                  email={`${OtherUser(chatData).flat()[index].name}`}
                  className={s.img}
                />
                <p> {OtherUser(chatData).flat()[index].name} </p>
              </div>
              <div className={s.text}>
                <p>{item?.last_chat?.content}</p>
                {item?.last_chat?.content && (
                  <p className={s.status}>
                    Last seen{" "}
                    <time dateTime={item.last_chat.created_at}>
                      {getRelativeTime(item.last_chat.created_at)}
                    </time>
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))
      ) : (
        <>채팅방이 없습니다</>
      )}
    </ul>
  );

  return renderChatList(filteredData);
}
