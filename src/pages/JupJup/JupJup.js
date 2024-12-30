import { useInfiniteQuery } from "@tanstack/react-query";
import { sharingListApi } from "api/sharingApi";
import SearchIcon from "components/icons/SearchIcon";
import JupjupItem from "components/jupjup/JupjupItem";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import jup from "./JupJup.module.scss";
import { cleanup } from "@testing-library/react";

export default function JupJup() {
  const [ref, isView] = useInView();
  const size = 3; // 한 페이지당 아이템 수
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const {
    data: jupjupList,
    fetchNextPage: jupjupListFetchNextPage,
    hasNextPage: jupjupListHasNextPage,
    status: jupjupListStatus,
    error: jupjupListError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["jupjupList", searchValue],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await sharingListApi(searchValue, pageParam, size);
      return response;
    },
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    staleTime: 0, // NOTE: 0 초로 해도 괜찮을까
    refetchOnWindowFocus: true,
    getNextPageParam: (lastPage, allPages) => {
      console.log('aa', allPages);
      return lastPage.length === size ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });


  useEffect(() => {
    if (isView && jupjupListHasNextPage) {
      jupjupListFetchNextPage();
    }
  }, [isView, jupjupListHasNextPage, jupjupListFetchNextPage, jupjupList]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchValue(inputValue);
    refetch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  

  return (
    <div className={jup.container}>
      <div className={jup.searchContainer}>
        <div className={jup.searchInputWrapper}>
          <input
            id="text"
            name="text"
            type="text"
            className={jup.searchInput}
            placeholder="검색어를 입력하세요."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <SearchIcon className={jup.searchIcon} onClick={handleSearch} />
        </div>
      </div>
      <div className={jup.writeButtonContainer}>
        <Link
          to={"/WriteUpdate/new"}
          state={{ type: "write" }}
          className={jup.writeButton}
        >
          글쓰기
        </Link>
      </div>

      <div className={jup.postsContainer}>
        <div className={jup.postsWrapper}>
          <div className={jup.postsList}>
            {jupjupListStatus === "success" && jupjupList.pages.length > 0 ? (
              jupjupList.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.map((post, postIndex) => (
                    <JupjupItem key={`${pageIndex}-${postIndex}`} data={post} />
                  ))}
                </React.Fragment>
              ))
            ) : jupjupListStatus === "success" && jupjupList.pages.length === 0 ? (
              <p>데이터가 없습니다.</p>
            ) : null}
          </div>
          {jupjupListStatus === "loading" && <p>데이터를 불러오는 중...</p>}
          {jupjupListStatus === "error" && (
            <p>오류 발생: {jupjupListError.message}</p>
          )}
          <div ref={ref} style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
}