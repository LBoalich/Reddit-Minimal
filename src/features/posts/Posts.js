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
 
  if (postsAreLoading) return <div className="loading">Loading Posts</div>;

  if(postsFailed) return alert("Site Error.  Please Refresh");

  const MobileComponent = () => {
    if (subredditsVisable) {
      return null;
    } else {
      return (
        <div className='posts-container'>
          <PostsList posts={posts} />
        </div>
      )
    }
  };
  const DesktopComponent = () => (
    <div className='posts-container'>
      <PostsList posts={posts} />
    </div>
  );

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};

export default Posts;
