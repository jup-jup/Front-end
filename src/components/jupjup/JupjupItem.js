import CommentIcon from "components/icons/CommentIcon";
import React from "react";
import jup from "./jupjupitem.module.scss";
import ViewIcon from "components/icons/ViewIcon";
import { Link } from "react-router-dom";
import { getRelativeTime } from "util/day";

const JupjupItem = ({ data, postIndex }) => {
  return (
    <div className={jup.postItem}>
      {/* <h3>{data.title}</h3>
      <p>상태: {data.status}</p>
      <p>생성일: {new Date(data.createdAt).toLocaleDateString()}</p>
      <p>위치: {data.location}</p>
      <div className={jup.postStats}>
        <span>채팅수: {data.chatCnt}</span>
        <span>조회수: {data.viewCnt}</span>
      </div>
      {data.imageIds && data.imageIds.length > 0 && (
        <div className={jup.postImages}>
          <p>{data.imageIds.length} 개의 이미지</p>
        </div>
      )} */}

      <article className={jup.postItem}>
        <Link to={`/jupjupDetail/${data.giveaway_id}`} className={jup.content}>
          <div className={jup.postImageLink}>
            <img alt="" src={`${process.env.REACT_APP_IMG}${data.images[0]?.path}`} className={jup.postImage} />
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
