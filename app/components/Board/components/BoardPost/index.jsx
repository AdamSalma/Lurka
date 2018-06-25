import React, { PureComponent } from "react";
import cx from "classnames";
import "./styles";

import { Counter, Spinner, Icon, Line } from "~/components/UI";

import Header from "./BoardPostHeader";
import Comment from "./BoardPostComment";
import Image from "./BoardPostImage";

import { setHTML } from "~/utils/react";

const { boardPostWidth } = Lurka.settings;

const BoardPost = ({ onClick, onImageLoad, post, className, onContextMenu }) => {
  const { thumbnail, width, height } = post.media;

  //  Calculates image placeholder height before image loads:
  const imageHeight = height * (boardPostWidth / width);

  return (
    <button
      id={"t" + post.id}
      className={cx("BoardPost", className)}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Image src={thumbnail} height={imageHeight} onLoad={onImageLoad} />
      <Comment
        title={post.title}
        comment={post.comment}
        time={post.time}
        replies={post.replies}
      />
    </button>
  );
};

export default BoardPost;
