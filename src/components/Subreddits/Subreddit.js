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
    alert("clicked");
    dispatch(loadSubredditPosts(name));
  }

  return (
    <li className='subreddit-container'>
        <img src={img} alt={`${name} icon`} className="subreddit-icon hover" onClick={handleOnClick} /> {/* add on click event that changes posts to the subreddit posts */}
        <p className="subreddit-name">{name}</p>
    </li>
  );
}
