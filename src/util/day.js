import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const dayChat = (date) => {
  const today = dayjs();

  if (today.isSame(date, "day")) {
    // console.log("오늘과 같은 날짜입니다.");
    return dayjs(date).format("HH:mm");
  } else if (today.isBefore(date, "day")) {
    // console.log("오늘보다 이전 날짜입니다.");
    return dayjs(date).format("YY-MM-DD HH:mm");
  } else {
    // console.log("오늘보다 나중 날짜입니다.");
    return dayjs(date).format("YY-MM-DD HH:mm");
  }
};

dayjs.extend(relativeTime);
export const getRelativeTime = (dateString) => {
  const date = dayjs(dateString);
  return date.fromNow();
};
