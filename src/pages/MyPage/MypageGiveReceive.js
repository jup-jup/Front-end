import { posts } from 'components/dummydata/chat';
import { Link } from 'react-router-dom';
import styles from './MypageGiveReceive.module.scss';
import { useLocation } from 'react-router-dom';
import CommentIcon from 'components/icons/CommentIcon';
import ViewIcon from 'components/icons/ViewIcon';

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
                          <CommentIcon className={styles.commentIcon} />
                          {post.author.name}
                        </a>
                      </p>
                      <div className={styles.viewCount}>
                        <ViewIcon className={styles.viewIcon} />
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
              <Link to='/WriteUpdate' 
              state={{ type: 'edit' }}
              className={styles.button}
              >
                수정하기
              </Link>
              <Link to='/WriteUpdate' 
              className={styles.deleteButton}
              >
                삭제하기
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