import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectComments,
  isLoadingComments,
  loadCommentsForPost,
} from './commentsSlice';
import CommentsList from '../../components/Comments/CommentsList';

const Comments = ({loadCommentsArguments}) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const commentsAreLoading = useSelector(isLoadingComments);
  const { id } = loadCommentsArguments;

  useEffect(() => {
    dispatch(loadCommentsForPost({loadCommentsArguments}));
  }, [dispatch, loadCommentsArguments]);
 
  if (commentsAreLoading) {
     return <div>Loading Comments</div>;
  };

  return (
    <div className='comments-container'>
      <h3 className='comments-title'>Comments</h3>
      <CommentsList comments={comments[id]} />
    </div>
  );
};

export default Comments;
