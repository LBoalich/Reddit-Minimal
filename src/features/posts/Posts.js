import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPosts,
  selectPosts,
  isLoadingPosts,
} from "./postsSlice";
import PostsList from "../../components/Posts/PostsList";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsAreLoading = useSelector(isLoadingPosts);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);
 
  if (postsAreLoading) return <div>Loading Posts</div>;

  return (
    <div className='posts-container'>
      <PostsList posts={posts} />
    </div>
  );
};

export default Posts;
