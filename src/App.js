import React from 'react';
import './App.css';

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};


function App() {
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
    </div>
  );
}

export default App;
