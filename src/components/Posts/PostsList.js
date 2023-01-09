import React from 'react';
import Post from './Post';

export default function PostsList({ posts }) {
  if (!posts) {
    return null;
  };
  
  return (
    <ul className='posts-list'>
      {posts.map(post => {
        return <Post post={post} />
      })}
    </ul>
  );
}
