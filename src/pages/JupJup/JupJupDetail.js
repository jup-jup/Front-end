import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jd from './JupJupDetail.module.scss';

const posts = [
  {
    id: 1,
    title: '맥북에어 나눔합니다.',
    href: '#',
    state: '예약중',
    description: '블라블라 설명',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
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
                  {[1, 2, 3].map((index) => (
                    <div key={index} className={jd.imageWrapper}>
                      <img
                        alt=''
                        src={post.imageUrl}
                        className={jd.image}
                      />
                      <div className={jd.imageOverlay} />
                    </div>
                  ))}
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
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={jd.heartIcon}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' />
                        </svg>
                      ) : (
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className={jd.heartIcon}>
                          <path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
                        </svg>
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
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={jd.commentIcon}>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' />
                          </svg>
                          {post.author.name}
                        </a>
                      </div>
                      <div className={jd.viewCount}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={jd.viewIcon}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
                          <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                        </svg>
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