import { useGetChatList } from "hooks/useChatApi";
import Gravatar from "react-gravatar";
import { Link, useLocation } from "react-router-dom";
import { getRelativeTime } from "util/day";
import s from "./chat.module.scss";
import { useAtom } from "jotai";
import { userAtom } from "store/User";
// import { selectedGiveawayIdAtom } from 'store/Chat';
import { useEffect, useState, useCallback } from "react";
import { useGetSharingId } from "hooks/useSharingApi";
import { sharingDetailApi } from "api/sharingApi";

export default function ChatOtherList() {
  const [user] = useAtom(userAtom);
  // const [selectedGiveawayId] = useAtom(selectedGiveawayIdAtom);
  const location = useLocation();
  const giveawayId = location.state?.giveawayId;
  const [descriptions, setDescriptions] = useState({});

  const [filteredData, setFilteredData] = useState([]);
  const { data, isLoading, refetch } = useGetChatList();
  // const { data: postDetail } = useGetSharingId(location?.state?.giveaway_id);

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

  useEffect(() => {
    const fetchDescriptions = async () => {
      const descriptionData = {};
      for (let item of data) {
        const description = await contentRender(item.giveaway_id);
        descriptionData[item.giveaway_id] = description;
      }
      setDescriptions(descriptionData);
    };

    fetchDescriptions();
  }, [data]);

  const OtherUser = (data) => {
    const nameFilter = data.map((item) =>
      item.joined_users.filter((item) => item.name !== user.userName)
    );
    return nameFilter;
  };

  if (isLoading) return <div>로딩중 ...</div>;

  console.log("목록", data);

  const contentRender = async (id) => {
    try {
      const res = await sharingDetailApi(id);
      return res.data?.description;
      // return `Description for ${id}`; // 여기서는 예시로 id를 반환
    } catch (error) {
      console.error("Error fetching description", error);
    }
  };

  const renderChatList = (chatData) => (
    <ul className={s.chat_list}>
      {chatData?.length > 0 ? (
        chatData.map((item, index) => (
          <li key={index}>
            <Link
              to={`/chatOtherDetail/${item.id}`}
              className={s.item}
              state={{
                type: "old",
                giveaway_id: `${item.giveaway_id}`,
                receiverId: `${item.joined_users[0].id}`,
              }}
            >
              <div className={s.profile}>
                <Gravatar
                  email={`${OtherUser(chatData).flat()[index].name}`}
                  className={s.img}
                />
                <div className={s.name}>
                  <p>{OtherUser(chatData).flat()[index].name} </p>
                  <p className={s.title}>{descriptions[item.giveaway_id] || "Loading..."}</p>
                </div>
                {/* {contentRender(item.giveaway_id)} */}
                {/* {item.giveaway_id} */}
              </div>
              <div className={s.text}>
                <p className={s.chat}>{item?.last_chat?.content}</p>
                {item?.last_chat?.content && (
                  <p className={s.status}>
                    Last seen {getRelativeTime(item.last_chat.created_at)}
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
