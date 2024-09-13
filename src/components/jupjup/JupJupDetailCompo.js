import jd from "./JupJupDetailCompo.module.scss";
import React, { useState } from 'react';
import UnHeart from 'components/icons/UnHeart';
import ViewIcon from 'components/icons/ViewIcon';
import Heart from 'components/icons/Heart';
import CommentIcon from 'components/icons/CommentIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { getRelativeTime } from "util/day";

export default function JupJupDetailCompo({ data }) {
  const [isFilled, setIsFilled] = useState(false);

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  return (
    <>
      <article className={jd.postItem}>
        <div className={jd.imageGallery}>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className={jd.swiper}
          >
            {data.images.map((image, index) => (
              <SwiperSlide key={index} className={jd.swiperSlide}>
                <div className={jd.imageWrapper}>
                  <img alt={image.file_name} src={`${process.env.REACT_APP_IMG}${image.path}`} className={jd.image} />
                  <div className={jd.imageOverlay} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={jd.postContent}>
          <div className={jd.postMeta}>
            <span className={jd.postDate}>
              {getRelativeTime(data.created_at)}
            </span>
            <span className={jd.postCategory}>{data.location}</span>
            {/* <div onClick={toggleHeart} className={jd.heartButton}>
              {!isFilled ? (
                <UnHeart className={jd.heartIcon} />
              ) : (
                <Heart className={jd.heartIcon} />
              )}
              <span className={jd.heartText}>찜</span>
            </div> */}
          </div>
          <div className={jd.postTitle}>
            <h3>
              <a>
                <span className={jd.postTitleLink} />
                {data.title}
              </a>
            </h3>
          </div>
          <p className={jd.postState}>{data.state}</p>
          <p className={jd.postDescription}>{data.description}</p>
          <div className={jd.postFooter}>
            <div className={jd.authorInfo}>
              <div className={jd.viewCount}>
                <CommentIcon className={jd.commentIcon} />
                {data.chat_cnt == null ? 0 : data.chat_cnt}
              </div>
              <div className={jd.viewCount}>
                <ViewIcon className={jd.viewIcon} />
                <p>{data.view_cnt == null ? 0 : data.view_cnt}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}