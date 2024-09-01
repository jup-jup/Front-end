import { posts } from "components/dummydata/chat";
import CommentIcon from "components/icons/CommentIcon";
import SearchIcon from "components/icons/SearchIcon";
import ViewIcon from "components/icons/ViewIcon";
import { Link } from "react-router-dom";
import jup from "./JupJup.module.scss";
import { useEffect, useRef, useState } from "react";

const fetchMoreData = async (page) => {
  // 여기에 실제 데이터 요청을 넣어주세요.
  // 예를 들어, 페이지 번호를 포함한 API 호출
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
  const data = await response.json();
  return data;
};

export default function JupJup() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const lastElementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setLoading(true);
          fetchMoreData(page)
            .then((newData) => {
              console.log('cc', newData);
              setData((prevData) => [...prevData, ...newData]);
              setPage((prevPage) => prevPage + 1);
              setLoading(false);
              if (newData.length === 0) {
                setHasMore(false);
              }
            })
            .catch(() => {
              setLoading(false);
            });
        }
      },
      { threshold: 1.0 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [loading, hasMore, page]);

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
          {/* <div className={jup.postsList}>
            {posts.map((post) => (
              <article key={post.id} className={jup.postItem}>
                <Link to={`/jupjupDetail/${post.id}`} className={jup.content}>
                  <div className={jup.postImageLink}>
                    <img alt="" src={post.imageUrl} className={jup.postImage} />
                    <div className={jup.postImageOverlay} />
                  </div>
                  <div className={jup.postContent}>
                    <time dateTime={post.datetime} className={jup.postDate}>
                      {post.date}
                    </time>
                    <span className={jup.postCategory}>
                      {post.category.title}
                    </span>
                    <h3 className={jup.postTitle}>{post.title}</h3>
                    <p className={jup.postDescription}>{post.description}</p>
                    <div className={jup.postFooter}>
                      <div className={jup.authorInfo}>
                        <div className={jup.authorName}>
                          <span
                            href={post.author.href}
                            className={jup.authorNameLink}
                          >
                            <CommentIcon className={jup.commentIcon} />
                            {post.author.name}
                          </span>
                        </div>
                        <div className={jup.viewCount}>
                          <ViewIcon className={jup.viewIcon} />
                          <p className={jup.viewCountText}>
                            {post.author.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div> */}
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
          {loading && <p>Loading more items...</p>}
          <div ref={lastElementRef} style={{ height: "200px", border: '1px solid black' }} />
        </div>
      </div>
    </div>
  );
}
