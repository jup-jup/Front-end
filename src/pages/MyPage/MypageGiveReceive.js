import { posts } from 'components/dummydata/chat';
import { Link } from 'react-router-dom';
import styles from './MypageGive.module.scss';
import { useLocation } from 'react-router-dom';

export default function MypageGive() {
  const location = useLocation();
  const { type } = location.state || { type: 'give' };  // 기본값으로 'give' 사용
  
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <div className={styles.postList}>
            {posts.map((post) => (
              <article key={post.id} className={styles.postItem}>
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <img
                      alt=''
                      src={post.imageUrl}
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <time dateTime={post.datetime} className={styles.postDate}>
                      {post.date}
                    </time>
                    <a href={post.category.href} className={styles.postCategory}>
                      {post.category.title}
                    </a>
                  </div>
                  <div className={styles.postTitle}>
                    <h3>
                      <a href={post.href}>
                        <span className={styles.postTitleLink} />
                        {post.title}
                      </a>
                    </h3>
                  </div>
                  <p className={styles.postState}>{post.state}</p>
                  <p className={styles.postDescription}>{post.description}</p>
                  <div className={styles.postFooter}>
                    <div className={styles.authorInfo}>
                      <p className={styles.authorName}>
                        <a href={post.author.href} className={styles.authorLink}>
                          <span className={styles.authorLinkOverlay} />
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={styles.commentIcon}>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' />
                          </svg>
                          {post.author.name}
                        </a>
                      </p>
                      <div className={styles.viewCount}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={styles.viewIcon}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
                          <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                        </svg>
                        <p className={styles.viewCountText}>{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {type === 'give' ? (
            <div className={styles.actionButtons}>
              <Link to='/chatOtherDetail' className={styles.button}>
                대화중인 채팅 방
              </Link>
              <Link to='/jupjupUpdate' className={styles.button}>
                수정하기
              </Link>
            </div>
            ): (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}