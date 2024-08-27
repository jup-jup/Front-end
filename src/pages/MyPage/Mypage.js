import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { posts } from 'components/dummydata/chat';
// import { useTodos } from '../hooks/useApi';
import mp from './Mypage.module.scss';

const tabs = [
  { name: '나눔내역', href: '#', current: false },
  { name: '받음내역', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('나눔내역');

  //react query test
  // const { data, isLoading, error, refetch } = useTodos({
  //   // 옵션 예시
  //   refetchInterval: 5000, // 5초마다 자동으로 다시 조회
  //   staleTime: 10000, // 10초 동안 데이터를 "신선"하다고 간주
  // });

  // if (isLoading) {
  //   return <div className='loading'>데이터를 불러오는 중...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className='error'>데이터를 불러오는 데 문제가 발생했습니다.</div>
  //   );
  // }

  // if (!data || data.data.length === 0) {
  //   return <div className='no-data'>표시할 데이터가 없습니다.</div>;
  // }

  return (
    //test data
    //   <div>
    //   <ul>
    //     {data?.data.map((post) => (
    //       <li key={post.id}>
    //         <h2>{post.email}</h2>
    //         {/* <p>{post.body}</p> */}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
      <div className={mp.container}>
      <div className={mp.tabsContainer}>
        <nav className={mp.tabsNav}>
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.name);
              }}
              className={classNames(
                mp.tab,
                activeTab === tab.name ? mp.activeTab : mp.inactiveTab
              )}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      <div className={mp.searchContainer}>
        <div className={mp.searchInputWrapper}>
          <input
            id='text'
            name='text'
            type='text'
            className={mp.searchInput}
            placeholder='검색어를 입력하세요.'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={mp.searchIcon}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </div>
      </div>

      <div className={mp.contentContainer}>
        <h3 className={mp.contentTitle}>
          {activeTab === '나눔내역' ? '나눔내역' : '받음내역'}
        </h3>
        <div className={mp.postsContainer}>
          {posts.map((post) => (
            <article key={post.id} className={mp.postItem}>
              <Link
                to="/MypageGiveReceive"
                state={{ type: activeTab === '나눔내역' ? 'give' : 'receive' }}
                className={mp.postImageLink}
              >
                <img
                  alt=''
                  src={post.imageUrl}
                  className={mp.postImage}
                />
                <div className={mp.postImageOverlay} />
              </Link>
              <div className={mp.postContent}>
                <Link
                  to={activeTab === '나눔내역' ? '/MypageGIVE' : '/MypageReceive'}
                  className={mp.postMeta}
                >
                  <time dateTime={post.datetime} className={mp.postDate}>
                    {post.date}
                  </time>
                  <a href={post.category.href} className={mp.postCategory}>
                    {post.category.title}
                  </a>
                </Link>
                <Link
                  to={activeTab === '나눔내역' ? '/MypageGIVE' : '/MypageReceive'}
                  className={mp.postTitleLink}
                >
                  <h3 className={mp.postTitle}>{post.title}</h3>
                  <p className={mp.postDescription}>{post.description}</p>
                </Link>
                <div className={mp.postFooter}>
                  <div className={mp.authorInfo}>
                    <p className={mp.authorName}>
                      <a href={post.author.href} className={mp.authorLink}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className={mp.commentIcon}
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
                          />
                        </svg>
                        {post.author.name}
                      </a>
                    </p>
                    <div className={mp.viewCount}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className={mp.viewIcon}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                        />
                      </svg>
                      <p className={mp.viewCountText}>{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
