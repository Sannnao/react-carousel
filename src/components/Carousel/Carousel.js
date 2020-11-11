import React, { useState } from 'react';
import './carousel.css';

const THRESHOLD = 10;

export const Carousel = React.forwardRef(({ content, handleNext, handlePrev }, ref) => {
  const [startMouse, setStartMouse] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  const handleMouseDown = ({ pageX }) => {
    setStartMouse(pageX)
    setIsMouseDown(true);
  }

  const handleMouseUp = () => {
    if (left >= THRESHOLD) {
      handleNext();
    } else if (right >= THRESHOLD) {
      handlePrev();
    }

    setIsMouseDown(false);
  }

  const handleMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { pageX } = e;

    if (isMouseDown) {
      const moveRight = pageX - startMouse;
      const moveLeft = startMouse - pageX;
      const carouselWidth = ref.current.scrollWidth;
      const carouselShift = +ref.current.style.transform.match(/\d+/)[0];
      const pageWidth = ref.current.clientWidth;
      const perToPix = 100 / pageWidth * carouselShift;

      console.log(carouselShift);
      console.log(perToPix);
      console.log(e);
      console.dir(ref.current);

      // ref.current.style.transform = `translateX(-${perToPix}px)`;
    }
  }

  return (
    <div className="carousel-track">
      <ul
        ref={ref}
        className="carousel"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMoveCapture={handleMouseMove}
      >
        {content.map((item, i) => (
          <li className="carousel__item" key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
