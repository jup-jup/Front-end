import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { myPageSharingGet, myPageReceiveGet } from "api/myPageApi";
import mp from './Mypage.module.scss';
import SearchIcon from 'components/icons/SearchIcon';
import CommentIcon from 'components/icons/CommentIcon';
import ViewIcon from 'components/icons/ViewIcon';

const tabs = [
  { name: '나눔내역', href: '#', current: false },
  { name: '받음내역', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('나눔내역');
  const [searchTerm, setSearchTerm] = useState('');
  const [ref, inView] = useInView();
  const PAGE_SIZE = 3;

  const fetchPosts = async ({ pageParam = 0 }) => {
    const apiFunction = activeTab === '나눔내역' ? myPageSharingGet : myPageReceiveGet;
    const response = await apiFunction(pageParam, PAGE_SIZE);
    return {
      data: response,
      nextPage: response.length === PAGE_SIZE ? pageParam + 1 : undefined,
    };
  };


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['myPagePosts', activeTab],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const getFilteredPosts = () => {
    if (!data) return [];
    return data.pages.flatMap(page => page.data).filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPosts = getFilteredPosts();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;


  return (
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
            type="text"
            className={mp.searchInput}
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className={mp.searchIcon} />
        </div>
      </div>

      <div className={mp.contentContainer}>
        <h3 className={mp.contentTitle}>
          {activeTab === '나눔내역' ? '나눔내역' : '받음내역'}
        </h3>
        <div className={mp.postsContainer}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.id} className={mp.postItem}>
                <Link
                  to="/MypageGiveReceive"
                  state={{ type: activeTab === '나눔내역' ? 'give' : 'receive' }}
                  className={mp.postImageLink}
                >
                  <img
                    alt=""
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
                    <span className={mp.postCategory}>
                      {post.category}
                    </span>
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
                        <span className={mp.authorLink}>
                          <CommentIcon className={mp.commentIcon} />
                          {post.author}
                        </span>
                      </p>
                      <div className={mp.viewCount}>
                        <ViewIcon className={mp.viewIcon} />
                        <p className={mp.viewCountText}>{post.views}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>게시물을 찾을 수 없습니다.</p>
          )}
          <div ref={ref} style={{ height: "20px" }} /> {/* 스크롤 감지를 위한 요소 */}
        </div>
      </div>
    </div>
  );
}