import React from 'react';
import { useDispatch } from 'react-redux';
import { loadSubredditPosts } from '../../features/posts/postsSlice';

export default function Subreddit({ subreddit }) {
  const dispatch = useDispatch();
  const subredditObject = {
    name: subreddit.display_name,
    img: subreddit.icon_img,
  };

  if (subredditObject.img.length <= 0) {
    subredditObject.img = require("./Reddit_Mark_OnDark.png")
  };

  const { name, img } = subredditObject;

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(loadSubredditPosts(name));
    window.scrollTo(0, 0);
  }

  return (
    <li className='subreddit-container hover' onClick={handleOnClick} >
        <img src={img} alt={`${name} icon`} className="subreddit-icon" /> 
        <p className="subreddit-name">{name}</p>
    </li>
  );
}
