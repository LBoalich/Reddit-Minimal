import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectComments,
  selectShowComments,
} from './commentsSlice';
import CommentsList from '../../components/Comments/CommentsList';

const Comments = ({id}) => {
  const comments = useSelector(selectComments);
  const showComments = useSelector(selectShowComments);
 
  const commentDisplay = showComments[id] ? "block" : "none";

  return (
    <div className='comments-container' style={{display:commentDisplay}}>
      <h3 className='comments-title'>Comments</h3>
      <CommentsList comments={comments[id]} />
    </div>
  );
};

export default Comments;
