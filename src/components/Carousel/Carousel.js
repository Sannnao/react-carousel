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
    console.log('mouse down')
    const carouselShift = +ref.current.style.transform.match(/\d+/)[0];
    ref.current.style.transition = 'none'

    setCarouselShift(carouselShift);
    setStartMouse(pageX);
    setIsMouseDown(true);
  }

  const handleMouseUp = ({ pageX }) => {
    console.log('mouse up')

    const moveRight = pageX - startMouse;
    const moveLeft = startMouse - pageX;
    console.log('move left', moveLeft);
    ref.current.style.transition = '0.5s'

    if (moveLeft >= THRESHOLD) {
      console.log('WHY')
      handleNext();
      setStartMouse(pageX);
    } else if (moveRight >= THRESHOLD) {
      handlePrev();
      setStartMouse(pageX);
    } else {
      console.log('prevPage', prevPage);

      ref.current.style.transform = `translateX(-${carouselShift}px)`;
    }

    setIsMouseDown(false);
  }

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isMouseDown) {
      const currTranslate = carouselShift - (e.pageX - startMouse);

      console.log(e.pageX - startMouse)

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
