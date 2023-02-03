import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../../utilities/helpers';
import Search from "../../features/search/Search";
import { loadPosts } from '../../features/posts/postsSlice';
import { useViewport } from '../../utilities/ViewPort';
import { showSubreddits, toggleShowSubreddits } from '../../features/subreddits/subredditsSlice';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const subredditsVisable = useSelector(showSubreddits);
  const dispatch = useDispatch();
  const { width } = useViewport();
  const breakpoint = 770;

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 60) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  const handleOnClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    dispatch(loadPosts());
  };  

  const handleSubredditsClick = (e) => {
    e.preventDefault();
    const newSubredditsVisability = subredditsVisable ? false : true;
    dispatch(toggleShowSubreddits(newSubredditsVisability)); 
  };

  const navbarStyles = {
    position: 'fixed',
    height: '50px',
    width: '100%',
    backgroundColor: 'grey',
    textAlign: 'center',
    transition: 'top 500ms'
  }

  const MobileComponent = () => (
    <header style={{ ...navbarStyles, top: visible ? '0' : '-50px' }}>
      <nav className="navbar">
        <button className="subreddits-button hover" onClick={handleSubredditsClick} type="button">
          Subreddits
        </button>
        <div className="logo">
          <img src={require("./NavBar.png")} alt="Return to Home button" className="logo-img hover" onClick={handleOnClick}/>
        </div>
        <Search />
      </nav>
    </header>
  );
  const DesktopComponent = () => (
    <div style={{ ...navbarStyles, top: visible ? '0' : '-50px' }}>
      <nav className="navbar">
        <div className="home hover" onClick={handleOnClick}>
          <span className="home-reddit">reddit</span><span className="home-fun">BOARD</span>
        </div>
        <Search />
        <div className="logo">
          <img src={require("./NavBar.png")} alt="Return to Home button" className="logo-img hover" onClick={handleOnClick}/>
        </div>
      </nav>
    </div>
  );

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};

export default Navbar;