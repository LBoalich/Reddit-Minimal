import React from 'react';
import Subreddit from './Subreddit';

export default function SubredditList({ subreddits }) {
  if (!subreddits) {
    return null;
  };
  
  return (
    <ul className='subreddits-list'>
      {subreddits.map(subreddit => {
        return <Subreddit subreddit={subreddit} />
      })}
    </ul>
  );
}
