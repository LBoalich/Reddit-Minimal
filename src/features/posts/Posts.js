import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadPosts,
  selectPosts,
  isLoadingPosts,
  failedToLoadPosts,
} from "./postsSlice";
import PostsList from "../../components/Posts/PostsList";
import { showSubreddits } from '../subreddits/subredditsSlice';
import { useViewport } from '../../utilities/ViewPort';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsAreLoading = useSelector(isLoadingPosts);
  const postsFailed = useSelector(failedToLoadPosts);
  const subredditsVisable = useSelector(showSubreddits);
  const { width } = useViewport();
  const breakpoint = 770;

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  if (postsFailed) return alert("Error loading posts data");

  const MobileComponent = () => {
    if (subredditsVisable) {
      return null;
    } else {
      return (
        <section className='posts-container'>
          {postsAreLoading && (
            <h1 className="loading">Loading Posts</h1>
          )}
          <PostsList posts={posts} />
        </section>
      )
    }
  };
  const DesktopComponent = () => (
    <section className='posts-container'>
      {postsAreLoading && (
        <h1 className="loading">Loading Posts</h1>
      )}
      <PostsList posts={posts} />
    </section>
  );

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};

export default Posts;
