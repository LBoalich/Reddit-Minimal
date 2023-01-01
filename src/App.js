import React, { useEffect } from 'react';
import './App.css';

function App() {
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  var prevScrollpos = window.pageYOffset;
  useEffect(() => {
    const handleScroll = event => {
      console.log('window.scrollY', window.scrollY);
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-50px";
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <nav class="navbar">
        <div class="home">
          <a href="">redditMinimal</a> {/* add href link so returns to home state */}
        </div>
        <div class="searchBar">
          <input type="text" placeholder="Search.." /> {/* Add search icon */}
        </div>
        <div class="logo">
          <img src="" alt="" /> {/* add reddit logo.  On click returns to home */}
        </div>
      </nav>
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
