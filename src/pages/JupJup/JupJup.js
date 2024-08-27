import { posts } from 'components/dummydata/chat';
import { Link } from 'react-router-dom';
import jup from './JupJup.module.scss';
import SearchIcon from 'components/icons/SearchIcon';
import CommentIcon from 'components/icons/CommentIcon';
import ViewIcon from 'components/icons/ViewIcon';

export default function JupJup() {
  return (
    <div className={jup.container}>
      <div className={jup.searchContainer}>
        <div className={jup.searchInputWrapper}>
          <input
            id='text'
            name='text'
            type='text'
            className={jup.searchInput}
            placeholder='검색어를 입력하세요.'
          />
          <SearchIcon className={jup.searchIcon} />
        </div>
      </div>
      <div className={jup.writeButtonContainer}>
        <Link
          to='/WriteUpdate' 
          state={{ type: 'write' }}
          className={jup.writeButton}
        >
          글쓰기
        </Link>
      </div>

      <div className={jup.postsContainer}>
        <div className={jup.postsWrapper}>
          <div className={jup.postsList}>
            {posts.map((post) => (
              <article
                key={post.id}
                className={jup.postItem}
              >
                <Link
                  to='/jupjupDetail'
                  className={jup.postImageLink}
                >
                  <img
                    alt=''
                    src={post.imageUrl}
                    className={jup.postImage}
                  />
                  <div className={jup.postImageOverlay} />
                </Link>
                <div className={jup.postContent}>
                  <Link
                    to='/jupjupDetail'
                    className={jup.postMetadata}
                  >
                    <time dateTime={post.datetime} className={jup.postDate}>
                      {post.date}
                    </time>
                    <a
                      href={post.category.href}
                      className={jup.postCategory}
                    >
                      {post.category.title}
                    </a>
                  </Link>
                  <Link to='/jupjupDetail' className={jup.postTitleLink}>
                    <h3 className={jup.postTitle}>
                      {post.title}
                    </h3>
                    <p className={jup.postDescription}>
                      {post.description}
                    </p>
                  </Link>
                  <div className={jup.postFooter}>
                    <div className={jup.authorInfo}>
                      <div className={jup.authorName}>
                      <a href={post.author.href} className={jup.authorNameLink}>
                        <CommentIcon className={jup.commentIcon} />
                        {post.author.name}
                      </a>
                      </div>
                      <div className={jup.viewCount}>
                        <ViewIcon className={jup.viewIcon} />
                        <p className={jup.viewCountText}>{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}