import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowComments, selectShowComments } from '../../features/comments/commentsSlice';

export default function Comment({ comment, commentsId }) {
  const dispatch = useDispatch();
  const showComments = useSelector(selectShowComments);

  const commentObject = {
    author: comment.author,
    body: comment.body,
    score: comment.score,
    id: comment.id,
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(toggleShowComments({[commentsId] : false}));
  };

  const { author, body, score, id } = commentObject;

  return (
    <li className='comment-container'>
      <div className="close-container">
        <img className="close-button hover" onClick={handleOnClick} src={require("./closeButton2.png")} />
      </div>
      <span className="comment-body">{body}</span>
      <div className="comment-info">
        <p>{author}</p>
      </div>
    </li>
  );
}
