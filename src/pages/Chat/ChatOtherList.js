import { people } from "components/dummydata/chat";
import { Link } from "react-router-dom";
import s from "./chat.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getChatListApi } from "api/chatApi";
import Gravatar from "react-gravatar";
import { getRelativeTime } from "util/day";

export default function ChatOtherList() {
  const { data, isLoading } = useQuery({
    queryKey: ["chatList"],
    queryFn: getChatListApi,
  });

  console.log('채팅 리스트', data);

  if (isLoading) return <div>로딩중 ...</div>
    return (
      <ul className={s.chat_list}>
        {data?.map((item, index) => (
          <li key={index}>
            <Link
              to={`/chatOtherDetail/${item.giveaway_id}`}
              className={s.item}
            >
              <div className={s.profile}>
                <Gravatar email="2" className={s.img} />
                <p> 참여자 닉네임 </p>
              </div>
              <div className={s.text}>
                <p>{item.last_chat.content}</p>
                {item.last_chat.content && (
                  <p className={s.status}>
                    Last seen{" "}
                    <time dateTime={item.last_chat.created_at}>
                      {getRelativeTime(item.last_chat.created_at)}
                    </time>
                  </p>
                )}
                {/* {
                <div className={s.status}>
                  <span className={s.icon}></span>
                  <p>Online</p>
                </div>
              } */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
}
