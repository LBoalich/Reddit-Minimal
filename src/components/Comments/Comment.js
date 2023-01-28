import React from 'react';

export default function Comment({ comment }) {
  const commentObject = {
    author: comment.author,
    body: comment.body,
    score: comment.score,
    id: comment.id,
  };

  const { author, body, score, id } = commentObject;

  return (
    <li className='comment-container'>
      <span className="comment-body">{body}</span>
      <div className="comment-info">
        <p>{author}</p>
      </div>
    </li>
  );
}
