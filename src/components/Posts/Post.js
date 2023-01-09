import React from 'react';

export default function Post({ post }) {
  const { author, media, numComments, score, selftextHtml, title } = post.data.children[0].data;
  return (
    <li key={title} className='post-container'>
        <h3 className="title">{title}</h3>
        <div className="media" >
            <img src={media} alt="media"/>
        </div>
        <h4 className="text">{selftextHtml}</h4>
        <div className="about">
            <div className="vote">
                <img className="upvote" src="" alt="up vote"/>
                <p className="score">{score}</p>
                <img className="downvote" src="" alt="down vote"/>
            </div>
            <p className="author">{author}</p>
            <div className="comments">
                <img className="comment-img" src="" alt="com"/>
                <p className="num-comments">{numComments}</p>
            </div>
        </div>
    </li>
  );
}
