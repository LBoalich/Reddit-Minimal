import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from '../../utilities/helpers';
import Search from "../../features/search/Search";
import { loadPosts } from '../../features/posts/postsSlice';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

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
    dispatch(loadPosts());
  };  

  const navbarStyles = {
    position: 'fixed',
    height: '50px',
    width: '100%',
    backgroundColor: 'grey',
    textAlign: 'center',
    transition: 'top 500ms'
  }

  return (
    <div style={{ ...navbarStyles, top: visible ? '0' : '-50px' }}>
      <nav className="navbar">
        <div className="home">
          <p className="hover" onClick={handleOnClick}>redditMinimal</p> 
        </div>
        <Search />
        <div className="logo">
          <img src={require("./NavBar.png")} alt="" className="logo-img hover" onClick={handleOnClick}/>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;