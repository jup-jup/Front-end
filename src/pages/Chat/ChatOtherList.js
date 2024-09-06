import { people } from "components/dummydata/chat";
import { Link } from "react-router-dom";
import s from "./chat.module.scss";

export default function ChatOtherList() {
  
  return (
    <ul className={s.chat_list}>
      {people.map((person) => (
        <li key={person.email}>
          <Link to={`/chatOtherDetail/${person.id}`} className={s.item}>
            <div className={s.profile}>
              <img alt="" src={person.imageUrl} />
              <p> {person.name} </p>
            </div>
            <div className={s.text}>
              <p>{person.role}</p>
              {person.lastSeen ? (
                <p className={s.status}>
                  Last seen{" "}
                  <time dateTime={person.lastSeenDateTime}>
                    {person.lastSeen}
                  </time>
                </p>
              ) : (
                <div className={s.status}>
                  <span className={s.icon}></span>
                  <p>Online</p>
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
