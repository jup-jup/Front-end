import jd from "./JupJupDetailCompo.module.scss";
import React, { useEffect, useState } from 'react';
import UnHeart from 'components/icons/UnHeart';
import ViewIcon from 'components/icons/ViewIcon';
import Heart from 'components/icons/Heart';
import CommentIcon from 'components/icons/CommentIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
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

export default function JupJupDetailCompo ({ data }) {
  const [isFilled, setIsFilled] = useState(false);
  console.log(data, 'dataaaa')
  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

    return (
      <>
                <article className={jd.postItem}>
                  <div className={jd.imageGallery}>

                  {posts.map((post) => (
                    <Swiper
                      modules={[Pagination, Navigation]}
                      spaceBetween={10}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      navigation
                      breakpoints={{
                        // when window width is >= 640px
                        640: {
                          slidesPerView: 2,
                          spaceBetween: 20
                        },
                        // when window width is >= 1024px
                        1024: {
                          slidesPerView: 3,
                          spaceBetween: 30
                        }
                      }}
                      className={jd.swiper}
                    >
                      {post.images.map((image, index) => (
                        <SwiperSlide key={index} className={jd.swiperSlide}>
                          <div className={jd.imageWrapper}>
                            <img
                              alt=''
                              src={image}
                              className={jd.image}
                            />
                            <div className={jd.imageOverlay} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ))}
                  </div>
                  <div className={jd.postContent}>
                    <div className={jd.postMeta}>
                      <time dateTime={data.datetime} className={jd.postDate}>
                        {data.createdAt.split('T')[0]}
                      </time>
                      <a className={jd.postCategory}>
                        {data.location}
                      </a>
                      <div onClick={toggleHeart} className={jd.heartButton}>
                        {!isFilled ? (
                          <UnHeart className={jd.heartIcon} />
                        ) : (
                          <Heart className={jd.heartIcon} />
                        )}
                        <span className={jd.heartText}>찜</span>
                      </div>
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
                            {data.chatCnt == null ? 0 : data.chatCnt}
                        </div>
                        <div className={jd.viewCount}>
                          <ViewIcon className={jd.viewIcon} />
                          <p>{data.viewCnt == null ? 0 : data.viewCnt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </>
    );
  }