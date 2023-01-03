import React, { useState, useEffect } from 'react';
import { debounce } from '../utilities/helpers';
import "./NavBar.css";
import Search from "../features/search/Search";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 60) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

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
      <nav class="navbar">
        <div class="home">
          <a href="">redditMinimal</a> {/* add href link so returns to home state */}
        </div>
        <Search />
        <div class="logo">
          <img src="" alt="" /> {/* add reddit logo.  On click returns to home */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;