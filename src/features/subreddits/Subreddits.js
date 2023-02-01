import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadSubreddits,
  selectSubreddits,
  isLoadingSubreddits,
  showSubreddits,
  toggleShowSubreddits
} from "./subredditsSlice";
import SubredditsList from "../../components/Subreddits/SubredditsList";
import { useViewport } from '../../utilities/ViewPort';

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const subredditsAreLoading = useSelector(isLoadingSubreddits);
  const subredditsVisable = useSelector(showSubreddits);
  const { width } = useViewport();
  const breakpoint = 770;

  useEffect(() => {
    dispatch(loadSubreddits());
  }, [dispatch]);

  const handleSubredditsClick = (e) => {
    e.preventDefault();
    const newSubredditsVisability = subredditsVisable ? false : true;
    dispatch(toggleShowSubreddits(newSubredditsVisability)); 
  };

  const MobileComponent = () => {
    if (subredditsVisable) {
      return (
        <div className='subreddits-container hover' onClick={handleSubredditsClick}>
      {subredditsAreLoading ? <div className="loading">Loading Subreddits</div> : null}
      <h3 className='subreddits-title'>Subreddits</h3>
      <SubredditsList subreddits={subreddits} />
    </div>
      );
    } else {
      return null;
    }
  };
  const DesktopComponent = () => (
    <div className='subreddits-container'>
      {subredditsAreLoading ? <div className="loading">Loading Subreddits</div> : null}
      <h3 className='subreddits-title'>Subreddits</h3>
      <SubredditsList subreddits={subreddits} />
    </div>
  );

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};

export default Subreddits;
