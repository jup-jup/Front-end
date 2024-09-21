import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; 

dayjs.extend(relativeTime);
dayjs.locale("ko"); 

export const dayChat = (date, type = "utc") => {
  const today = dayjs();

  if (today.isSame(date, "day")) {
    // console.log("오늘과 같은 날짜입니다.");
    // return dayjs(date).format("HH:mm");
    return dayjs(date).add(9, "hour").format("HH:mm");
  } else if (today.isBefore(date, "day")) {
    // console.log("오늘보다 이전 날짜입니다.");
    return dayjs(date).add(9, "hour").format("YY-MM-DD HH:mm");
    // return dayjs(date).format("YY-MM-DD HH:mm");
  } else {
    // console.log("오늘보다 나중 날짜입니다.");
    return dayjs(date).add(9, "hour").format("YY-MM-DD HH:mm");
    // return dayjs(date).format("YY-MM-DD HH:mm");
  }
};

export const getRelativeTime = (dateString) => {
  const date = dayjs(dateString).add(9, "hour");
  return date.fromNow();
};
