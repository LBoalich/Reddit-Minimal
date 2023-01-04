import React from 'react';
import './App.css';
import Navbar from "./components/NavBar/NavBar";
import Subreddits from './features/subreddits/Subreddits';

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
        <Subreddits />
      </div>
    </div>
  );
}

export default App;
