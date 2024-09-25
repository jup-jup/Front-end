import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jd from "./JupJupDetail.module.scss";
import CommentIcon from "components/icons/CommentIcon";
import ViewIcon from "components/icons/ViewIcon";
import Heart from "components/icons/Heart";
import UnHeart from "components/icons/UnHeart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { sharingDetailApi } from "api/sharingApi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import JupJupDetailCompo from "components/jupjup/JupJupDetailCompo";
import { userAuth } from "hooks/useAuth";
import instance from "api/axios";

export default function JupJupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFilled, setIsFilled] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userName } = userAuth(localStorage.getItem("accessToken"));

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
        const response = await sharingDetailApi(id);
        setDetailData(response.data); // API 응답 구조에 따라 .data가 필요할 수 있습니다
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
      console.log("cc", res.data?.room_id);
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
                  const roomId = await intoChat();
                  if (roomId) {
                    navigate(`/chatOtherDetail/${roomId}`, {
                      state: { type: "new" },
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
