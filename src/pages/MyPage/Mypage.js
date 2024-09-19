import React, { useState, useEffect, Suspense } from 'react';
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { myPageSharingGet, myPageReceiveGet } from "api/myPageApi";
import mp from "./Mypage.module.scss";import SearchIcon from "components/icons/SearchIcon";
import CommentIcon from "components/icons/CommentIcon";
import ViewIcon from "components/icons/ViewIcon";
import ErrorBoundary from "components/Error/ErrorBoundary";

const tabs = [
  { name: "나눔내역", href: "#", current: false },
  { name: "받음내역", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Post
function PostList({ activeTab, searchTerm }) {
  const [ref, inView] = useInView();
  const PAGE_SIZE = 3;

  const fetchPosts = async ({ pageParam = 0 }) => {
    const apiFunction = activeTab === "나눔내역" ? myPageSharingGet : myPageReceiveGet;
    const response = await apiFunction(pageParam, PAGE_SIZE);
    return {
      data: response,
      nextPage: response.length === PAGE_SIZE ? pageParam + 1 : undefined,
    };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["myPagePosts", activeTab],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    suspense: true,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const getFilteredPosts = () => {
    if (!data) return [];
    return data.pages
      .flatMap((page) => page.data)
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className={mp.postsContainer}>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Link
            key={post.id}
            to={`/MypageGiveReceive/${post.giveaway_id}`}
            state={{
              type: activeTab === "나눔내역" ? "give" : "receive",
            }}
            className={mp.postLink}
          >
            <article className={mp.postItem}>
              <div className={mp.postImageLink}>
                <img alt="" src={`${process.env.REACT_APP_IMG}${post.images[0]?.path}`} className={mp.postImage} />
                <div className={mp.postImageOverlay} />
              </div>
              <div className={mp.postContent}>
                <time dateTime={post.createdAt} className={mp.postDate}>
                  {/* {post.createdAt.split('T')[0]} */}
                </time>
                <span className={mp.postCategory}>{post.location}</span>
                <h3 className={mp.postTitle}>{post.title}</h3>
                <div className={mp.postFooter}>
                  <div className={mp.authorInfo}>
                    <div className={mp.authorName}>
                      <span className={mp.authorNameLink}>
                        <CommentIcon className={mp.commentIcon} />
                        <p className={mp.viewCountText}>
                          {post.chat_cnt == null ? 0 : post.chat_cnt}
                        </p>
                      </span>
                    </div>
                    <div className={mp.viewCount}>
                      <ViewIcon className={mp.viewIcon} />
                      <p className={mp.viewCountText}>
                        {post.view_cnt == null ? 0 : post.view_cnt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))
      ) : (
        <p>게시물을 찾을 수 없습니다.</p>
      )}
      <div ref={ref} style={{ height: "20px" }} />
    </div>
  );
}

export default function Mypage() {
  const [activeTab, setActiveTab] = useState("나눔내역");
  const [searchTerm, setSearchTerm] = useState("");

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
          {activeTab === "나눔내역" ? "나눔내역" : "받음내역"}
        </h3>
        <ErrorBoundary>
          <Suspense fallback={<div>로딩 중...</div>}>
            <PostList activeTab={activeTab} searchTerm={searchTerm} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}