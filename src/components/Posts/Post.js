import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowComments, selectShowComments, selectComments, loadCommentsForPost } from '../../features/comments/commentsSlice';
import Comments from '../../features/comments/Comments';

export default function Post({ post }) {
  const dispatch = useDispatch();
  const showComments = useSelector(selectShowComments);
  const comments = useSelector(selectComments);
  const postObject = {
    author: post.author,
    media: post.media,
    numComments: post.num_comments,
    score: post.score,
    selftextHtml: post.selftext,
    title: post.title,
    url: post.url,
    id: post.id,
    subreddit: post.subreddit,
    mediaData: post.media_metadata,
  };
  const { author, media, numComments, score, selftextHtml, title, url, id, subreddit, mediaData } = postObject;
  
  const titleNoSpecial = title.replace(/[^a-zA-Z ]/g, "");
  const titleNoSpaces = titleNoSpecial.replaceAll(" ", "_");
  const loadCommentsArguments = {id, subreddit, titleNoSpaces};

  const handleOnClick = (e) => {
    e.preventDefault();
    if (!comments[id]) {
      dispatch(loadCommentsForPost({loadCommentsArguments}));
    } else {
        const nextDisplay = showComments[id] ? false : true;
        dispatch(toggleShowComments({[id] : nextDisplay}));
    }
  };

  let mediaVideo;
  let mediaUrl;
  if (media) {
    mediaVideo= media.reddit_video;
  };
  if (mediaVideo) {
    mediaUrl = mediaVideo.fallback_url;
  };

  const galleryUrls = [];
  if (post.is_gallery) {
    const keys = Object.keys(mediaData);
    keys.map(key => galleryUrls.push({[key] : (mediaData[key].p[1].u.replaceAll("amp;", ""))}));
  };

  return (
    <li className='post-container'>
        <h3 className="title">{title}</h3>

        {(url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) && (
            <img className="post-url" src={url} alt="url" />
        )} 
        {mediaUrl && (
            <video className="post-media" autoPlay muted controls>
                <source src={mediaUrl} />
            </video>
        )}
        {(galleryUrls.length > 0) && (
            <ul className='gallery-list'>
              {galleryUrls.map(galleryObject => {
                const key = Object.keys(galleryObject);
                const value = Object.values(galleryObject)
                return <img src={value[0]} alt="url" key={key[0]}/>
              })}
            </ul>
        )}
        <p className="text">{selftextHtml}</p>

        <div className="about">
            <div className="vote">
                <img className="upVote" src={require("./upArrow.png")} alt="up vote"/>
                <p className="score">{score}</p>
                <img className="downVote" src={require("./downArrow.png")} alt="down vote"/>
            </div>

            <p className="author">Author: {author}</p>

            <div className="comments hover" key={id} onClick={handleOnClick}>
                <img className="comment-img" src={require("./comment.png")} alt="com"/>
                <p className="num-comments">{numComments}</p>
            </div>
        </div>

        <Comments id={id}/>
    </li>
  );
}
