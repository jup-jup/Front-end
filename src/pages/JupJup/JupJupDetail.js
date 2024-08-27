import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jd from './JupJupDetail.module.scss';
import CommentIcon from 'components/icons/CommentIcon';
import ViewIcon from 'components/icons/ViewIcon';
import Heart from 'components/icons/Heart';
import UnHeart from 'components/icons/UnHeart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div className={jd.container}>
      <div className={jd.innerContainer}>
        <div className={jd.content}>
          <div className={jd.postList}>
            {posts.map((post) => (
              <article key={post.id} className={jd.postItem}>
                <div className={jd.imageGallery}>
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
                </div>
                <div className={jd.postContent}>
                  <div className={jd.postMeta}>
                    <time dateTime={post.datetime} className={jd.postDate}>
                      {post.date}
                    </time>
                    <a href={post.category.href} className={jd.postCategory}>
                      {post.category.title}
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
                      <a href={post.href}>
                        <span className={jd.postTitleLink} />
                        {post.title}
                      </a>
                    </h3>
                  </div>
                  <p className={jd.postState}>{post.state}</p>
                  <p className={jd.postDescription}>{post.description}</p>
                  <div className={jd.postFooter}>
                    <div className={jd.authorInfo}>
                      <div className={jd.authorName}>
                        <a href={post.author.href} className={jd.authorLink}>
                          <span className={jd.authorLinkOverlay} />
                          <CommentIcon className={jd.commentIcon} />
                          {post.author.name}
                        </a>
                      </div>
                      <div className={jd.viewCount}>
                        <ViewIcon className={jd.viewIcon} />
                        <p>{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className={jd.chatButtonContainer}>
              <Link to='/chat' className={jd.chatButton}>
                채팅하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}