import React from 'react';

export default function Subreddit({ subreddit }) {
  const subredditObject = {
    name: subreddit.display_name,
    title: subreddit.title,
    img: subreddit.icon_img,
    url: subreddit.url,
  };

  if (subredditObject.img.length <= 0) {
    subredditObject.img = require("./Reddit_Mark_OnDark.png")
  };

  const { name, title, img, url } = subredditObject;
  return (
    <li key={title} className='subreddit-container'>
        <img src={img} alt={`${name} icon`} className="subreddit-icon" /> {/* add on click event that changes posts to the subreddit posts */}
        <p className="subreddit-name">{name}</p>
    </li>
  );
}
