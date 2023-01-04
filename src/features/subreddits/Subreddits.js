import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadSubreddits,
  selectSubreddits,
  isLoadingSubreddits,
} from "./subredditsSlice";
import SubredditList from "../../components/Subreddits/SubredditsList";

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const subredditsAreLoading = useSelector(isLoadingSubreddits);

  useEffect(() => {
    dispatch(loadSubreddits());
  }, [dispatch]);
 
  if (subredditsAreLoading) return <div>Loading Subreddits</div>;

  return (
    <div className='subreddits-container'>
      <h3 className='subreddits-title'>Subreddits</h3>
      <SubredditList subreddits={subreddits} />
    </div>
  );
};

export default Subreddits;
