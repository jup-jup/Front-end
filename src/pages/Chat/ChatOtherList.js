import { people } from "components/dummydata/chat";
import { Link } from "react-router-dom";
import s from "./chat.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getChatListApi } from "api/chatApi";
import Gravatar from "react-gravatar";
import { getRelativeTime } from "util/day";

export default function ChatOtherList() {
  const { data } = useQuery({
    queryKey: ["chatList"],
    queryFn: getChatListApi,
  });

  return (
    <ul className={s.chat_list}>
      {data?.map((item, index) => (
        <li key={index}>
          <Link to={`/chatOtherDetail/${item.id}`} className={s.item}>
            <div className={s.profile}>
              <Gravatar email="rudwnok123@naver.com" className={s.img} />
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
