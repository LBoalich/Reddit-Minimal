import React from 'react';
import "./css/App.css";
import Navbar from "./components/NavBar/NavBar";
import Subreddits from './features/subreddits/Subreddits';
import Posts from "./features/posts/Posts";
import ScrollButton from './components/ToTopButton/ScrollButton';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <div className="features" >
        <Posts />
        <Subreddits />
        <ScrollButton />
      </div>
    </div>
  );
}

export default App;
