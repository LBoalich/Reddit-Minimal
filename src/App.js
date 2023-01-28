import React from 'react';
import "./css/App.css";
import Navbar from "./components/NavBar/NavBar";
import Subreddits from './features/subreddits/Subreddits';
import Posts from "./features/posts/Posts";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <div className="features" >
        <Posts />
        <Subreddits />
      </div>
    </div>
  );
}

export default App;
