import React, { useEffect, useState, useCallback } from "react";
import { useGetChatList } from "hooks/useChatApi";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import styles from './MypageGiveReceive.module.scss';
import JupJupDetailCompo from 'components/jupjup/JupJupDetailCompo';
import { MypgeDetailApi, MypgeDeleteApi } from "api/myPageApi";
import BasicModal from 'components/portalModal/basicmodal/BasicModal';
import { selectedGiveawayIdAtom } from 'store/Chat';
import { useAtom } from 'jotai';

export default function MypageGive() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state || { type: 'give' };
  const [detailData, setDetailData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const { data, isLoading } = useGetChatList();

  const [matchId, setMatchId] = useState(null);

  const [, setSelectedGiveawayId] = useAtom(selectedGiveawayIdAtom);

  console.log("채팅 리스트", data);

  useEffect(() => {
    if (data) {
      console.log(data, 'data')

      const matchingGiveaway = data.find(item => item.giveaway_id === parseInt(id));
      if (matchingGiveaway) {
        console.log(matchingGiveaway.giveaway_id, 'matchingGiveaway')
        console.log(parseInt(id), 'matchingGiveawayID')
        setMatchId(matchingGiveaway.giveaway_id);

        setSelectedGiveawayId(matchingGiveaway.giveaway_id);
        // 여기서 matchingGiveaway를 사용하여 추가 작업을 수행할 수 있습니다.
      } else {
        console.log("일치하는 giveaway를 찾을 수 없습니다.");
      }
      setLoading(false);
    }
  }, [data, id]);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
        const response = await MypgeDetailApi(id);
        setDetailData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailData();
  }, [id]);

  const deleteButton = () => {
    setDeleteConfirmModal(true);
  }

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await MypgeDeleteApi(id);
      setOpenErrorModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDeleteConfirmModal(false);
    }
  }

  const closeErrorModal = useCallback(() => {
    setOpenErrorModal(false);
  });

  if (!!openErrorModal) return window.location.href = '/mypage';

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!detailData) return <div>데이터가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <div className={styles.postList}>
            <JupJupDetailCompo data={detailData}/>
            {type === 'give' && (
              <div className={styles.actionButtons}>
                {matchId &&
                // <Link to={`/chatOtherDetail/${matchId}`} className={styles.button} state={{ type: "old" }}>
                //   대화중인 채팅 방
                // </Link>

                <Link to={`/chatOtherList`} className={styles.button} state={{ type: "old", giveawayId: matchId }}>
                  대화중인 채팅 방
                </Link>
                }
                <Link to={`/WriteUpdate/${id}`} state={{ type: 'edit' }} className={styles.button}>
                  수정하기
                </Link>
                <div onClick={deleteButton} className={styles.deleteButton}>
                  삭제하기
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {deleteConfirmModal && (
        <BasicModal
          setOnModal={setDeleteConfirmModal}
          className='confirm-modal'
          isDim
          onClose={() => setDeleteConfirmModal(false)}
        >
          <p>정말 삭제하시겠습니까?</p>
          <button onClick={confirmDelete}>예</button>
          <button onClick={() => setDeleteConfirmModal(false)}>아니오</button>
        </BasicModal>
      )}

      {openErrorModal && (
        <BasicModal
          setOnModal={setOpenErrorModal}
          className='error-modal'
          isDim
          onClose={closeErrorModal}
        >
          삭제완료
        </BasicModal>
      )}
    </div>
  );
}