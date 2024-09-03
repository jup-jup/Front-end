import React, { useEffect, useRef, useState } from "react";
import { posts } from "components/dummydata/chat";
import CommentIcon from "components/icons/CommentIcon";
import SearchIcon from "components/icons/SearchIcon";
import ViewIcon from "components/icons/ViewIcon";
import { Link } from "react-router-dom";
import jup from "./JupJup.module.scss";
import JupjupItem from "components/jupjup/JupjupItem";
import { useGetSharingList } from "hooks/useSharingApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPoketmonListAll } from "api/sharingApi";
import axios from "axios";

export default function JupJup() {
  const [ref, isView] = useInView();
  const search = '검색어';
  const size = 3; // 한 페이지당 아이템 수
  const {
    data: pokemonListAll,
    fetchNextPage: pokemonListAllFetchNextPage,
    hasNextPage: pokemonListAllHasNextPage,
    status: pokemonListAllStatus,
    error: pokemonListAllError,
  } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getPoketmonListAll(pageParam, size);
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
    if (isView && pokemonListAllHasNextPage) {
      pokemonListAllFetchNextPage();
    }
    console.log(pokemonListAll, 'data')
    
  }, [isView, pokemonListAllHasNextPage, pokemonListAllFetchNextPage]);

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
          to="/WriteUpdate"
          state={{ type: "write" }}
          className={jup.writeButton}
        >
          글쓰기
        </Link>
      </div>

      <div className={jup.postsContainer}>
        <div className={jup.postsWrapper}>
          <div className={jup.postsList}>
            {pokemonListAll?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.data.map((post, postIndex) => (
                  <JupjupItem key={`${pageIndex}-${postIndex}`} data={post} />
                ))}
              </React.Fragment>
            ))}
          </div>
          {pokemonListAllStatus === "loading" && <p>데이터를 불러오는 중...</p>}
          {pokemonListAllStatus === "error" && <p>오류 발생: {pokemonListAllError.message}</p>}
          <div ref={ref} style={{ height: "20px" }} /> {/* 스크롤 감지를 위한 요소 */}
        </div>
      </div>
    </div>
  );
}