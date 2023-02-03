import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleShowComments } from '../../features/comments/commentsSlice';

export default function Comment({ comment, commentsId }) {
  const dispatch = useDispatch();

  const commentObject = {
    author: comment.author,
    body: comment.body,
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(toggleShowComments({[commentsId] : false}));
  };

  const { author, body } = commentObject;

  return (
    <li className='comment-container'>
      <article className="comment-article">
        <div className="close-container">
          <img className="close-button hover" onClick={handleOnClick} src={require("./closeButton2.png")} alt="Close comments button"/>
        </div>
        <p className="comment-body">{body}</p>
        <footer className="comment-info">
          <p>{author}</p>
        </footer>
      </article>
    </li>
  );
}
