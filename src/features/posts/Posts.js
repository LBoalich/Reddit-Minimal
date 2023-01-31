import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPosts,
  selectPosts,
  isLoadingPosts,
  failedToLoadPosts,
} from "./postsSlice";
import PostsList from "../../components/Posts/PostsList";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsAreLoading = useSelector(isLoadingPosts);
  const postsFailed = useSelector(failedToLoadPosts);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);
 
  if (postsAreLoading) return <div className="loading">Loading Posts</div>;

  if(postsFailed) return alert("Site Error.  Please Refresh");

  return (
    <div className='posts-container'>
      <PostsList posts={posts} />
    </div>
  );
};

export default Posts;
