import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import styles from './MypageGiveReceive.module.scss';
import JupJupDetailCompo from 'components/jupjup/JupJupDetailCompo';
import { MypgeDetailApi, MypgeDeleteApi } from "api/myPageApi";
import BasicModal from 'components/portalModal/basicmodal/BasicModal';

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
                <Link to='/chatOtherDetail' className={styles.button}>
                  대화중인 채팅 방
                </Link>
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