import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jd from './JupJupDetail.module.scss';
import CommentIcon from 'components/icons/CommentIcon';
import ViewIcon from 'components/icons/ViewIcon';
import Heart from 'components/icons/Heart';
import UnHeart from 'components/icons/UnHeart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { sharingDetailApi } from "api/sharingApi";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import JupJupDetailCompo from 'components/jupjup/JupJupDetailCompo';

const posts = [
  {
    id: 1,
    title: '맥북에어 나눔합니다.',
    href: '#',
    state: '예약중',
    description: '블라블라 설명',
    images: [
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
      'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
      'https://images.unsplash.com/photo-1526925712774-2833a7ecd0d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
      'https://images.unsplash.com/photo-1526925712774-2833a7ecd0d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
      'https://images.unsplash.com/photo-1526925712774-2833a7ecd0d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80'
    ],
    date: '2024.07.11',
    datetime: '2020-03-16',
    category: { title: '인현동', href: '#' },
    author: {
      name: '11',
      role: '20',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
];

export default function JupJupDetail() {
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
        const response = await sharingDetailApi(id);
        setDetailData(response.data); // API 응답 구조에 따라 .data가 필요할 수 있습니다
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
    <div className={jd.container}>
      <div className={jd.innerContainer}>
        <div className={jd.content}>
          <div className={jd.postList}>
            <JupJupDetailCompo data={detailData} />
            <div className={jd.chatButtonContainer}>
              <Link to={`/chatOtherDetail/${id}`} className={jd.chatButton}>
                채팅하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}