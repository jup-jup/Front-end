import CommentIcon from "components/icons/CommentIcon";
import React from "react";
import jup from "./jupjupitem.module.scss";
import ViewIcon from "components/icons/ViewIcon";
import { Link } from "react-router-dom";

const JupjupItem = ({ data }) => {
  return (
    <article key={data.id} className={jup.postItem}>
      <Link to={`/jupjupDetail/${data.id}`} className={jup.content}>
        <div className={jup.postImageLink}>
          <img alt="" src={data.imageUrl} className={jup.postImage} />
          <div className={jup.postImageOverlay} />
        </div>
        <div className={jup.postContent}>
          <time dateTime={data.datetime} className={jup.postDate}>
            {data.date}
          </time>
          <span className={jup.postCategory}>{data.category.title}</span>
          <h3 className={jup.postTitle}>{data.title}</h3>
          <p className={jup.postDescription}>{data.description}</p>
          <div className={jup.postFooter}>
            <div className={jup.authorInfo}>
              <div className={jup.authorName}>
                <span href={data.author.href} className={jup.authorNameLink}>
                  <CommentIcon className={jup.commentIcon} />
                  {data.author.name}
                </span>
              </div>
              <div className={jup.viewCount}>
                <ViewIcon className={jup.viewIcon} />
                <p className={jup.viewCountText}>{data.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default JupjupItem;
