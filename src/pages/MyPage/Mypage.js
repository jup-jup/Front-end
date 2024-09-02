import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { posts } from 'components/dummydata/chat';
// import { useTodos } from '../hooks/useApi';
import mp from './Mypage.module.scss';
import SearchIcon from 'components/icons/SearchIcon';
import CommentIcon from 'components/icons/CommentIcon';
import ViewIcon from 'components/icons/ViewIcon';
import { useGetMyPageSharing, useGetMyPageReceive } from 'hooks/useMyPageApi';

const tabs = [
  { name: '나눔내역', href: '#', current: false },
  { name: '받음내역', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('나눔내역');

  const getMyPageSharingMutation = useGetMyPageSharing();
  const getMyPageReceiveMutation = useGetMyPageReceive();

  useEffect(() => {
    console.log(activeTab);
    if (activeTab === '나눔내역') {
      getMyPageSharingMutation.mutate();
    } else {
      getMyPageReceiveMutation.mutate();
    }
  }, [activeTab]);

  
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
          <SearchIcon className={mp.searchIcon} />
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
                  state={{ type: activeTab === '나눔내역' ? 'give' : 'receive' }}
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
                  state={{ type: activeTab === '나눔내역' ? 'give' : 'receive' }}
                  className={mp.postTitleLink}
                >
                  <h3 className={mp.postTitle}>{post.title}</h3>
                  <p className={mp.postDescription}>{post.description}</p>
                </Link>
                <div className={mp.postFooter}>
                  <div className={mp.authorInfo}>
                    <p className={mp.authorName}>
                      <a href={post.author.href} className={mp.authorLink}>
                        <CommentIcon className={mp.commentIcon} />
                        {post.author.name}
                      </a>
                    </p>
                    <div className={mp.viewCount}>
                      <ViewIcon className={mp.viewIcon} />
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
