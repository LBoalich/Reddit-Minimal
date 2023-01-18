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
    <li key={id} className='comment-container'>
      <span className="comment-body">{body}</span>
      <div className="comment-info">
        <p>Author: {author}</p>
        <p>Score: {score}</p>
      </div>
    </li>
  );
}