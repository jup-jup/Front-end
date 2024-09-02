import { posts } from "components/dummydata/chat";
import CommentIcon from "components/icons/CommentIcon";
import SearchIcon from "components/icons/SearchIcon";
import ViewIcon from "components/icons/ViewIcon";
import { Link } from "react-router-dom";
import jup from "./JupJup.module.scss";
import { useEffect, useRef, useState } from "react";
import JupjupItem from "components/jupjup/JupjupItem";
import { useGetSharingList } from "hooks/useSharingApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPoketmonListAll } from "api/sharingApi";
import axios from "axios";

export default function JupJup() {
  const [ref, isView] = useInView();
  const search = '검색어';

  const {
    data: pokemonListAll,
    fetchNextPage: pokemonListAllFetchNextPage,
    hasNextPage: pokemonListAllHasNextPage,
    status: pokemonListAllStatus,
  } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    // queryKey: ["pokemonList", search],
    queryFn: async ({ pageParam }) => getPoketmonListAll(pageParam, search),
    getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (isView && pokemonListAllHasNextPage) pokemonListAllFetchNextPage();
  }, [isView]);

  console.log("pokemonListAll", pokemonListAll?.pages);

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
            {posts.map((post) => (
              <JupjupItem data={post} />
            ))}
          </div>
          1111
          <ul>
            {pokemonListAll?.pages.map((item, index) => (
              <li key={index} style={{ height: "250px" }}>
                {item.next}
              </li>
            ))}
          </ul>
          {pokemonListAllStatus === "loading" && <p>Loading more items...</p>}
          <div
            ref={ref}
            style={{ height: "200px", border: "1px solid black" }}
          />
        </div>
      </div>
    </div>
  );
}
