import React, { useState } from 'react';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import { useEffect } from "react";

function Responsivelogo() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 590); // Example breakpoint for mobile
  };

  // Add an event listener to handle window resize
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <img
    src={isMobile ? logo2 : logo}
    alt="Responsive Image"
  />
  );
}

export default Responsivelogo;