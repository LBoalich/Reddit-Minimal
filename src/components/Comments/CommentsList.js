import React from 'react';
import Comment from "./Comment";

export default function CommentsList({ comments }) {
  if (!comments) {
    return null;
  };

  const commentsSlice = comments[0].slice(0, -1);

  return (
    <ul className='comments-list' >
      {commentsSlice.map((comment) => {
        return <Comment comment={comment} />
      })}
    </ul>
  );
}
