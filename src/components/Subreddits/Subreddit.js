import React from 'react';

export default function Subreddit({ subreddit }) {
  const { name, img, title, url } = subreddit
  return (
    <li key={title} className='subreddit-container'>
        <img src={img} /> {/* add on click event that changes posts to the subreddit posts */}
        <p>{name}</p>
    </li>
  );
}
