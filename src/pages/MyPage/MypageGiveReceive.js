import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { posts } from 'components/dummydata/chat';
import { Link } from 'react-router-dom';
import styles from './MypageGiveReceive.module.scss';
import { useLocation } from 'react-router-dom';
import CommentIcon from 'components/icons/CommentIcon';
import ViewIcon from 'components/icons/ViewIcon';
import JupJupDetailCompo from 'components/jupjup/JupJupDetailCompo';
import { MypgeDetailApi } from "api/myPageApi";

export default function MypageGive() {
  const location = useLocation();
  const { type } = location.state || { type: 'give' };  // 기본값으로 'give' 사용
  const [isFilled, setIsFilled] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
          const response = await MypgeDetailApi(id);
          setDetailData(response.data);
          console.log('give')
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailData();
    console.log(detailData)
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!detailData) return <div>데이터가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <div className={styles.postList}>
          <JupJupDetailCompo data={detailData}/>
            {type === 'give' ? (
            <div className={styles.actionButtons}>
              <Link to='/chatOtherDetail' className={styles.button}>
                대화중인 채팅 방
              </Link>
              <Link to='/WriteUpdate' 
              state={{ type: 'edit' }}
              className={styles.button}
              >
                수정하기
              </Link>
              <Link to='/WriteUpdate' 
              className={styles.deleteButton}
              >
                삭제하기
              </Link>
            </div>
            ): (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}