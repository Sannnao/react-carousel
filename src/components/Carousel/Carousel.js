import React, { useState, useEffect } from 'react';
import './carousel.css';

const THRESHOLD = 300;

export const Carousel = React.forwardRef(({ content, handleNext, handlePrev }, ref) => {
  const [startMouse, setStartMouse] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentTranslate, setCurrentTraslate] = useState(null);
  const [carouselShift, setCarouselShift] = useState(null);

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })

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
      handleNext();
      setStartMouse(pageX);
    } else if (moveRight >= THRESHOLD) {
      handlePrev();
      setStartMouse(pageX);
    } else {
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
      {isMouseDown
        && <div className="carousel-move-wrapper"></div>
      }
      <ul
        ref={ref}
        className="carousel"
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
