import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadSubreddits,
  selectSubreddits,
  isLoadingSubreddits,
  showSubreddits,
  toggleShowSubreddits,
  failedToLoadSubreddits,
} from "./subredditsSlice";
import SubredditsList from "../../components/Subreddits/SubredditsList";
import { useViewport } from '../../utilities/ViewPort';

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const subredditsAreLoading = useSelector(isLoadingSubreddits);
  const subredditsVisable = useSelector(showSubreddits);
  const subredditsFailed = useSelector(failedToLoadSubreddits)
  const { width } = useViewport();
  const breakpoint = 770;

  useEffect(() => {
    dispatch(loadSubreddits());
  }, [dispatch]);

  if (subredditsFailed) return alert("Error loading subreddits data");

  const handleSubredditsClick = (e) => {
    e.preventDefault();
    const newSubredditsVisability = subredditsVisable ? false : true;
    dispatch(toggleShowSubreddits(newSubredditsVisability)); 
  };

  const MobileComponent = () => {
    if (subredditsVisable) {
      return (
        <section className='subreddits-container hover' onClick={handleSubredditsClick}>
          {subredditsAreLoading ? <h1 className="loading">Loading Subreddits</h1> : null}
          <h1 className='subreddits-title'>Subreddits</h1>
          <SubredditsList subreddits={subreddits} />
        </section>
      );
    } else {
        return null;
      }
  };
  const DesktopComponent = () => (
    <section className='subreddits-container'>
      {subredditsAreLoading ? <h1 className="loading">Loading Subreddits</h1> : null}
      <h1 className='subreddits-title'>Subreddits</h1>
      <SubredditsList subreddits={subreddits} />
    </section>
  );

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};

export default Subreddits;
