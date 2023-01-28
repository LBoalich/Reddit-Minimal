import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowComments, selectShowComments, selectComments, loadCommentsForPost, isLoadingComments } from '../../features/comments/commentsSlice';
import Comments from '../../features/comments/Comments';

export default function Post({ post }) {
  const dispatch = useDispatch();
  const showComments = useSelector(selectShowComments);
  const comments = useSelector(selectComments);
  const commentsAreLoading = useSelector(isLoadingComments);
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
  };
  const { author, media, numComments, score, selftextHtml, title, url, id, subreddit, mediaData, preview, hint } = postObject;
  
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

  let previewData;
  let previewUrl;
  if (preview) {
    previewData = preview.reddit_video_preview;
  };
  if (previewData) {
    previewUrl = previewData.fallback_url;
  };

  let linkUrl;
  if (hint === "link") {
    linkUrl = post.preview.images[0].source.url.replaceAll("amp;", "");
  };

  const galleryUrls = [];
  if (post.is_gallery) {
    const keys = Object.keys(mediaData);
    keys.map(key => galleryUrls.push({[key] : (mediaData[key].p[1].u.replaceAll("amp;", ""))}));
  };

  return (
    <div>
      <li className='post-container'>
          <h3 className="title">{title}</h3>

          <div className="post-polaroid">
            <img className="tape" src={require("./tape.png")}/>
            <div className="post-polaroid-media">
              {(url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) && (
                <img className="post-img" src={url} alt="url" />
              )} 
              {mediaUrl && (
                <video className="post-media" autoPlay muted controls loop>
                    <source src={mediaUrl} />
                </video>
              )}
              {previewUrl && (
                <video className="post-media" autoPlay muted controls>
                  <source src={previewUrl} />
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
              {(hint === "link" && !previewUrl) && (
                <div className="link">
                  <img src={linkUrl} className="post-img" alt="url" />
                  <a href={url} className="link-url">{url}</a>
                </div>
              )}
              {(!(hint === "link" && !previewUrl) && !(galleryUrls.length > 0) && !mediaUrl && !previewUrl && !(url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) && selftextHtml) && (
                <p className="text">{selftextHtml}</p>
              )}
              {(!(hint === "link" && !previewUrl) && !(galleryUrls.length > 0) && !mediaUrl && !previewUrl && !(url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".gif")) && !selftextHtml) && (
                <img src={require("./backUp.jpg")} className="post-img"/>
              )}

            </div>

            <div className="about">
              <div className="vote">
                <div className="vote-center">
                  <img className="upVote" src={require("./upArrow.png")} alt="up vote"/>
                  <p className="score">{score}</p>
                  <img className="downVote" src={require("./downArrow.png")} alt="down vote"/>
                </div>
              </div>

              <p className="author">{author}</p>

              <div className="comments hover" key={id} onClick={handleOnClick}>
                <div>
                  <img className="comment-img" src={require("./comment.png")} alt="com"/>
                  <p className="num-comments">{numComments}</p>
                </div>   
              </div>
            </div>
          </div>
      </li>
      {(commentsAreLoading) && (
      <div className="loading" style={{color: "whitesmoke", paddingBottom: 20}}>Loading Comments</div>
      )}
      <Comments id={id}/>
    </div>
  );
}
