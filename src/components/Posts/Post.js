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
    preview: post.preview,
    hint: post.post_hint,
    gallery: post.is_gallery,
  };
  const { author, media, numComments, score, selftextHtml, title, url, id, subreddit, mediaData, preview, hint, gallery } = postObject;
  
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

  let mediaUrl;
  let isMedia = false;
  if (media) {
    try {
      const mediaVideo = media.reddit_video;
      mediaUrl = mediaVideo.fallback_url;
      isMedia = true;
    } catch {
        //Useing try...catch because json structure not always the same for media.  If not in above format will make entire page not render. No catch needed because switch statement below makes sure media will not render if mediaUrl not found.  
    }
  };

  let isText;
  selftextHtml ? isText = true : isText = false;

  let isPicture;
  (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) ? isPicture = true : isPicture = false;

  let youTubePreview;
  let isYoutube;
  url.includes("youtu.be") ? isYoutube = true : isYoutube = false;
  if (preview) {
    try {
      const youTubePreviewData = preview.images;
      youTubePreview = youTubePreviewData[0].source.url.replaceAll("amp;", "");
    } catch {
        youTubePreview = require("./backUp.jpg");
    }
  };

  let previewUrl;
  let isPreview = false;
  if (preview) {
    try {
      const previewData = preview.reddit_video_preview;
      previewUrl = previewData.fallback_url;
      isPreview = true;
    } catch {
        //Useing try...catch because json structure not always the same for preview.  If not in above format will make entire page not render. No catch needed because switch statement below makes sure preview will not render if previewUrl not found.  
      }
  };

  let linkUrl;
  let isLink = false;
  if (hint === "link") {
    try {
      linkUrl = post.preview.images[0].source.url.replaceAll("amp;", "");
      isLink = true;
    } catch {
        linkUrl = require("./backUp.jpg");
        isLink = true;
    }
  };

  const galleryUrls = [];
  let isGallery = false;
  if (gallery) {
    try{
      const keys = Object.keys(mediaData);
      keys.map(key => galleryUrls.push({[key] : (mediaData[key].p[1].u.replaceAll("amp;", ""))}));
      isGallery = true;
    } catch {
        //Useing try...catch because json structure not always the same for gallery.  If not in above format will make entire page not render. No catch needed because switch statement below makes sure gallery will not render if galleryUrls not found. 
    }
  };

  const mediaType = {
    video: isMedia,
    previewVideo: isPreview,
    picture: isPicture,
    link: isLink,
    pictureGallery: isGallery,
    youTube: isYoutube,
    text: isText,
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  const polaroidMedia = () => {
    switch (getKeyByValue(mediaType, true)) {
      case "video":
        return (
          <video className="post-media" autoPlay muted controls loop src={mediaUrl}>Video not supported</video>
        );

      case "previewVideo":
        return (
          <video className="post-media" autoPlay muted controls loop src={previewUrl}>Video not supported</video>
        );

      case "picture":
        return <img className="post-img" src={url} alt="Post Picture" />;

      case "link":
        return (
          <section className="link">
            <img src={linkUrl} className="post-img" alt="Post Picture" />
            <a href={url} className="link-url" target="_blank" rel="noopener noreferrer">{url}</a>
          </section>
        );
      
      case "pictureGallery":
        return (
          <ul className='gallery-list'>
            {galleryUrls.map(galleryObject => {
              const key = Object.keys(galleryObject);
              const value = Object.values(galleryObject)
              return <img className="post-img"src={value[0]} alt="Post Picture" key={key[0]}/>
            })}
          </ul>
        );

      case "youTube":
        const youTubeUrl = url.replaceAll("amp;", "");
        return (
          <section className="link">
            <img src={youTubePreview} className="post-img" alt="Post Picture" />
            <a href={youTubeUrl} className="link-url" target="_blank" rel="noopener noreferrer">{youTubeUrl}</a>
          </section>
        );
        
      case "text":
        return <p className="text">{selftextHtml}</p>;
        
      default:
        return <img src={require("./backUp.jpg")} className="post-img" alt="Have a Wonderful Day written on chalkboard" />;
  }};
  

  return (
    <article>
      <li className='post-container'>
          <h1 className="title">{title}</h1>

          <div className="post-polaroid">
            <img className="tape" src={require("./tape.png")} alt="piece of masking tape"/>

            <figure className="post-polaroid-media">
              {polaroidMedia()}
            </figure>

            <footer className="about">
              <section className="vote">
                <div className="vote-center">
                  <img className="upVote" src={require("./upArrow.png")} alt="up arrow"/>
                  <p className="score">{score}</p>
                  <img className="downVote" src={require("./downArrow.png")} alt="down arrow"/>
                </div>
              </section>

              <p className="author">{author}</p>

              <section className="comments hover" key={id} onClick={handleOnClick}>
                <div>
                  <img className="comment-img" src={require("./comment.png")} alt="comment bubble"/>
                  <p className="num-comments">{numComments}</p>
                </div>   
              </section>
            </footer>
          </div>
      </li>
      <Comments id={id}/>
    </article>
  );
}
