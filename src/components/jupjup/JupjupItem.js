import CommentIcon from "components/icons/CommentIcon";
import React from "react";
import jup from "./jupjupitem.module.scss";
import ViewIcon from "components/icons/ViewIcon";
import { Link } from "react-router-dom";
import { getRelativeTime } from "util/day";

const JupjupItem = ({ data, postIndex }) => {
  return (
    <div className={jup.postItem}>
      <article className={jup.postItem}>
        <Link to={`/jupjupDetail/${data.giveaway_id}`} className={jup.content}>
          <div className={jup.postImageLink}>
            {data.images && data.images.length > 0 ? (
              <img 
                alt="" 
                src={`${process.env.REACT_APP_IMG}${data.images[0]?.path}`} 
                className={jup.postImage} 
              />
            ) : (
              <div className={`${jup.postImage} ${jup.emptyImage}`}>
                <span>이미지 없음</span>
              </div>
            )}
            <div className={jup.postImageOverlay} />
          </div>
          <div className={jup.postContent}>
            <time dateTime={data.createdAt} className={jup.postDate}>
              {getRelativeTime(data.created_at)}
            </time>
            <span className={jup.postCategory}>{data.location}</span>
            <span className={jup.userName}>{data.user_name}</span>
            <h3 className={jup.postTitle}>{data.title}</h3>
            <p className={jup.postDescription}>{data.description}</p>
            <div className={jup.postFooter}>
              <div className={jup.authorInfo}>
                <div className={jup.authorName}>
                  <span href={data.location} className={jup.authorNameLink}>
                    <CommentIcon className={jup.commentIcon} />
                    {data.chat_cnt == null ? 0 : data.chat_cnt}
                  </span>
                </div>
                <div className={jup.viewCount}>
                  <ViewIcon className={jup.viewIcon} />
                  <p className={jup.viewCountText}>
                    {data.view_cnt == null ? 0 : data.view_cnt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default JupjupItem;