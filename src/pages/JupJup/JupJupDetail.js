import { sharingDetailApi } from "api/sharingApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jd from "./JupJupDetail.module.scss";
// Import Swiper styles
import instance from "api/axios";
import JupJupDetailCompo from "components/jupjup/JupJupDetailCompo";
import { userAuth } from "hooks/useAuth";
import { useAtom } from "jotai";
import { getChatListAtom } from "store/Chat";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getCookie } from "util/authCookie";

export default function JupJupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFilled, setIsFilled] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getChatList = useAtom(getChatListAtom);

  const { userName } = userAuth(getCookie('jup-jup-atk'));

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
        const response = await sharingDetailApi(id);
        setDetailData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailData();
  }, [id]);

  const intoChat = async () => {
    try {
      const res = await instance.post(
        `${process.env.REACT_APP_API_URL}/v1/chat-rooms`,
        {
          giveaway_id: id,
        }
      );
      return res?.data?.room_id;
    } catch (error) {
      console.error("Error fetching room id:", error);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!detailData) return <div>데이터가 없습니다.</div>;

  return (
    <div className={jd.container}>
      <div className={jd.content}>
        <div className={jd.postList}>
          <JupJupDetailCompo data={detailData} />
          <div className={jd.chatButtonContainer}>
            {detailData.giver.name !== userName && (
              <button
                onClick={async () => {
                  if (getChatList[0].some((item) => item.giveaway_id == id)) {
                    const result = getChatList[0].find(
                      (item) => item.giveaway_id == id
                    )?.id;
                    navigate(`/chatOtherDetail/${result}`, {
                      state: { type: "old", giveaway_id: id },
                    });
                  } else {
                    const roomId = await intoChat();
                    navigate(`/chatOtherDetail/${roomId}`, {
                      state: { type: "new", giveaway_id: id },
                    });
                  }
                }}
                className={jd.chatButton}
              >
                채팅하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
