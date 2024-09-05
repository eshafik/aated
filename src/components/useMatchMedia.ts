/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useMatchMedia = () => {
  const [isMobile, setIsMobile] = useState(false);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    if (screenWidth < 600) {
      setIsMobile(true);
    }
    window.addEventListener("resize", handleResize);
  }, [screenWidth]);

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else return setIsMobile(false);
  };

  return isMobile;
};
