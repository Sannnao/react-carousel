import React, { useState, useEffect } from 'react';
import './carousel.css';

const THRESHOLD = 300;

export const Carousel = React.forwardRef(({ content, handleNext, handlePrev }, ref) => {
  const [startMouse, setStartMouse] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentTranslate, setCurrentTraslate] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [carouselShift, setCarouselShift] = useState(null);

  useEffect(() => {
     ref.current.style.transform = `translateX(-${currentTranslate}px)`;
  }, [currentTranslate])

  const handleMouseDown = ({ pageX }) => {
    const carouselShift = +ref.current.style.transform.match(/\d+/)[0];

    setCarouselShift(carouselShift);
    setStartMouse(pageX);
    setIsMouseDown(true);
  }

  const handleMouseUp = ({ pageX }) => {
    const moveRight = pageX - startMouse;
    const moveLeft = startMouse - pageX;

    if (moveLeft >= THRESHOLD) {
      handleNext();
    } else if (moveRight >= THRESHOLD) {
      handlePrev();
    } else {
      ref.current.style.transform = `translateX(-${prevPage}px)`;
    }

    setIsMouseDown(false);
  }

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isMouseDown) {

      const pageWidth = ref.current.clientWidth;
      const currTranslate = carouselShift - (e.pageX - startMouse);

      setPrevPage(pageWidth);
      setCurrentTraslate(currTranslate);
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
