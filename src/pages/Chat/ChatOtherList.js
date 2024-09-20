import { useGetChatList } from "hooks/useChatApi";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import { getRelativeTime } from "util/day";
import s from "./chat.module.scss";
import { useEffect } from "react";

{
  /* <div className={s.status}>
  <span className={s.icon}></span>
  <p>Online</p>
</div>; */
}

export default function ChatOtherList() {
  const { data, isLoading } = useGetChatList();

  console.log("채팅 리스트", data);

  const OtherUser = (data) => {
    const nameFilter = data.map((item) =>
      item.joined_users.filter((item) => item.name !== "경")
    );
    return nameFilter;
  }

  if (isLoading) return <div>로딩중 ...</div>;
  return (
    <ul className={s.chat_list}>
      {data.length > 0 ? (
        data?.map((item, index) => (
          <li key={index}>
            <Link
              to={`/chatOtherDetail/${item.id}`}
              className={s.item}
              state={{ type: "old" }}
            >
              <div className={s.profile}>
                <Gravatar
                  email={`${OtherUser(data).flat()[index].name}`}
                  className={s.img}
                />
                <p> {OtherUser(data).flat()[index].name} </p>
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
}
