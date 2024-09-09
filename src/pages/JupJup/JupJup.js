import { useInfiniteQuery } from "@tanstack/react-query";
import { sharingListApi } from "api/sharingApi";
import SearchIcon from "components/icons/SearchIcon";
import JupjupItem from "components/jupjup/JupjupItem";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import jup from "./JupJup.module.scss";

export default function JupJup() {
  const [ref, isView] = useInView();
  const search = "검색어";
  const size = 3; // 한 페이지당 아이템 수
  const {
    data: jupjupList,
    fetchNextPage: jupjupListFetchNextPage,
    hasNextPage: jupjupListHasNextPage,
    status: jupjupListStatus,
    error: jupjupListError,
  } = useInfiniteQuery({
    queryKey: ["jupjupList"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await sharingListApi(pageParam, size);
      // console.log(response, 'response')
      // console.log(response.length , 'response length')
      // console.log(pageParam, 'pageParam')
      return {
        data: response,
        nextPage: response.length === size ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (isView && jupjupListHasNextPage) {
      jupjupListFetchNextPage();
    }
    console.log(jupjupList, "data");
  }, [isView, jupjupListHasNextPage, jupjupListFetchNextPage]);

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
          />
          <SearchIcon className={jup.searchIcon} />
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
            {jupjupList?.pages.length > 0
              ? jupjupList?.pages.map((page, pageIndex) => (
                  <React.Fragment key={pageIndex}>
                    {page.data.map((post, postIndex) => (
                      <JupjupItem
                        key={`${pageIndex}-${postIndex}`}
                        data={post}
                      />
                    ))}
                  </React.Fragment>
                ))
              : <div>데이터가 없습니다.</div>}
          </div>
          {jupjupListStatus === "loading" && <p>데이터를 불러오는 중...</p>}
          {jupjupListStatus === "error" && (
            <p>오류 발생: {jupjupListError.message}</p>
          )}
          <div ref={ref} style={{ height: "20px" }} />{" "}
          {/* 스크롤 감지를 위한 요소 */}
        </div>
      </div>
    </div>
  );
}
