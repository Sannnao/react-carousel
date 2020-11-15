import React, { useState, useEffect, useLayoutEffect } from 'react';
import './carousel.css';

const THRESHOLD = 20;

export const Carousel = React.forwardRef(({ content, handleNext, handlePrev }, ref) => {
  const [startMouse, setStartMouse] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentTranslate, setCurrentTraslate] = useState(null);
  const [carouselShift, setCarouselShift] = useState(null);

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleMouseDown)
    window.addEventListener('touchend', handleMouseUp)
    window.addEventListener('touchmove', handleMouseMove)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleMouseDown)
      window.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('touchmove', handleMouseMove)
    }
  })

  useLayoutEffect(() => {
    if (isMouseDown) {
      ref.current.style.transform = `translateX(-${currentTranslate}px)`;
    }
  }, [currentTranslate])

  const handleMouseDown = (e) => {
    const { pageX } = e;
    let startCords;

    if (e.type === 'touchstart') {
      startCords = e.touches[0].pageX;
    } else {
      startCords = pageX;
    }

    const carouselShift = +ref.current.style.transform.match(/\d+/)[0];
    ref.current.style.transition = 'none'

    setCarouselShift(carouselShift);
    setStartMouse(startCords);
    setIsMouseDown(true);
  }

  const handleMouseUp = (e) => {
    const { pageX } = e;
    let endCords;

    if (e.type === 'touchend') {
      endCords = e.changedTouches[0].pageX;
    } else {
      endCords = pageX;
    }

    const moveRight = endCords - startMouse;
    const moveLeft = startMouse - endCords;
    ref.current.style.transition = '0.3s'

    if (moveLeft >= THRESHOLD) {
      handleNext();
      setStartMouse(endCords);
    } else if (moveRight >= THRESHOLD) {
      handlePrev();
      setStartMouse(endCords);
    } else {
      ref.current.style.transform = `translateX(-${carouselShift}px)`;
    }

    setIsMouseDown(false);
  }

  const handleMouseMove = (e) => {
    let moveCords;

    if (e.type === 'touchmove') {
      moveCords = e.touches[0].pageX;
    } else {
      moveCords = e.pageX;
    }

    e.preventDefault();
    if (isMouseDown) {
      const currTranslate = carouselShift - (moveCords - startMouse);

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
