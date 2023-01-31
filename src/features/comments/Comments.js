import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectComments,
  selectShowComments,
  isLoadingComments, 
  failedToLoadComments,
} from './commentsSlice';
import CommentsList from '../../components/Comments/CommentsList';

const Comments = ({id}) => {
  const comments = useSelector(selectComments);
  const showComments = useSelector(selectShowComments);
  const commentsAreLoading = useSelector(isLoadingComments);
  const commentsFailed = useSelector(failedToLoadComments);
 
  const commentDisplay = showComments[id] ? "block" : "none";

  if (commentsAreLoading) return <div className="loading">Loading Comments</div>;

  if(commentsFailed) return alert("Site Error.  Please Refresh");

  return (
    <div className='comments-container' style={{display:commentDisplay}}>
      <CommentsList comments={comments[id]} />
    </div>
  );
};

export default Comments;
