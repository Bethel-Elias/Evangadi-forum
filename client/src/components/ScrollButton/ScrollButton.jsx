import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./scrollbutton.css";

const ScrollButton = ({ scrollContainer, step = 200 }) => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  const getScrollTarget = () => scrollContainer?.current || window;

  const handleScroll = () => {
    const target = getScrollTarget();
    const scrollTop = target.scrollTop ?? window.scrollY;
    const scrollHeight = target.scrollHeight ?? document.body.scrollHeight;
    const clientHeight = target.clientHeight ?? window.innerHeight;

    setShowTop(scrollTop > 50); // show up arrow after scrolling down a bit
    setShowBottom(scrollTop + clientHeight < scrollHeight - 20); // show down arrow if more content below
  };

  const scrollUp = () => {
    const target = getScrollTarget();
    target.scrollBy({ top: -step, behavior: "smooth" });
  };

  const scrollDown = () => {
    const target = getScrollTarget();
    target.scrollBy({ top: step, behavior: "smooth" });
  };

  useEffect(() => {
    const target = getScrollTarget();
    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-buttons">
      {showTop && (
        <button className="scroll-btn up" onClick={scrollUp}>
          <FaArrowUp />
        </button>
      )}
      {showBottom && (
        <button className="scroll-btn down" onClick={scrollDown}>
          <FaArrowDown />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
