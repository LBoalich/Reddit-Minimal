import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button, MobileButton } from './Styles';
import { useViewport } from '../../utilities/ViewPort';
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false);
  const { width } = useViewport();
  const breakpoint = 770;
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1650){
      setVisible(true)
    } 
    else if (scrolled <= 1650){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  const MobileComponent = () => (
    <MobileButton>
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} data-testid="scroll-button"/>
    </MobileButton>
  );
  const DesktopComponent = () => (
    <Button>
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} data-testid="scroll-button"/>
    </Button>
  );

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}
  
export default ScrollButton;