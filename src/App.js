import React from 'react';
import './App.css';
import Navbar from './components/NavBar';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <div class="features" >
        <div class="posts">
          <p class="post">Posts go Here</p> {/* Map over posts */}
          <p class="post">Next Posts goes here</p>
          <p class="post">And another one</p>
        </div>
        <div class="subreddits">
          <h1>Subreddits</h1>
          <p class="subreddit">Sub 1</p> {/* Map over subreddits */}
          <p class="subreddit">Sub 2</p> 
          <p class="subreddit">Sub 3</p>
        </div>
      </div>
    </div>
  );
}

export default App;
