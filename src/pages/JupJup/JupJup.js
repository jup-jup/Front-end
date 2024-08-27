import { posts } from 'components/dummydata/chat';
import { Link } from 'react-router-dom';
import jup from './JupJup.module.scss';

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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className={jup.searchIcon}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        </div>
      </div>
      <div className={jup.writeButtonContainer}>
        <Link
          to='/jupjupWrite'
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
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className={jup.commentIcon}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
                            />
                          </svg>
                          {post.author.name}
                        </a>
                      </div>
                      <div className={jup.viewCount}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className={jup.viewIcon}
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