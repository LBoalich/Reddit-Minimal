import React from 'react';
import "./css/App.css";
import Navbar from "./components/NavBar/NavBar";
import Subreddits from './features/subreddits/Subreddits';
import Posts from "./features/posts/Posts";
import ScrollButton from './components/ToTopButton/ScrollButton';
import { ViewportProvider } from './utilities/ViewPort';

function App() {
  
  return (
    <ViewportProvider>
      <div className="App">
        <Navbar />
        <div className="features" >
          <Posts />
          <Subreddits />
          <ScrollButton />
        </div>
      </div>
    </ViewportProvider>
  );
}

export default App;
