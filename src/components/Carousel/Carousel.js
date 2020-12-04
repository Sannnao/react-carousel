import React, { useState, useEffect, useLayoutEffect } from 'react';
import { setTransform } from '../../utils/setTransform';
import './carousel.css';

const CORDS_THRESHOLD = 150;
const TIME_THRESHOLD = 300;

export const Carousel = React.forwardRef(
  (
    { content, handleNext, handlePrev, handleTransition, isTransition },
    ref
  ) => {
    const [startMouse, setStartMouse] = useState(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [currentTranslate, setCurrentTranslate] = useState(null);
    const [carouselShift, setCarouselShift] = useState(null);
    const [timeDown, setTimeDown] = useState(null);
    const [goal, setGoal] = useState(null);
    const [isGoalAchieved, setIsGoalAchieved] = useState(false);

    useEffect(() => {
      const handleTransitionStart = () => {
        handleTransition(true);
      };
      const handleTransitionEnd = () => {
        setIsGoalAchieved(true);
      };
      ref.current.addEventListener('transitionstart', handleTransitionStart);
      ref.current.addEventListener('transitionend', handleTransitionEnd);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchstart', handleMouseDown);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);

      return () => {
        ref.current.removeEventListener(
          'transitionstart',
          handleTransitionStart
        );
        ref.current.removeEventListener('transitionend', handleTransitionEnd);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchstart', handleMouseDown);
        window.removeEventListener('touchend', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
      };
    });

    useEffect(() => {
      setTransform(ref, carouselShift);
    }, [carouselShift]);

    useLayoutEffect(() => {
      if (isMouseDown) {
        setTransform(ref, currentTranslate);
      }
    }, [currentTranslate]);

    const handleMouseDown = (e) => {
      const { pageX } = e;
      let startCords;

      if (e.type === 'touchstart') {
        startCords = e.touches[0].pageX;
      } else {
        startCords = pageX;
      }

      console.log(ref.current.getBoundingClientRect());
      const currentPosition = Math.abs(ref.current.getBoundingClientRect().x);

      setTimeDown(e.timeStamp);
      if (!isGoalAchieved) {
        setCarouselShift(currentPosition);
      } else {
        setCarouselShift(goal)
      }
      ref.current.style.transition = 'none';
      setStartMouse(startCords);
      setIsMouseDown(true);
    };

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
      ref.current.style.transition = '1s';
      const timeUp = Math.floor(e.timeStamp - timeDown);

      if (
        (moveLeft > 0 && timeUp <= TIME_THRESHOLD) ||
        moveLeft >= CORDS_THRESHOLD
      ) {
        setTransform(ref, window.innerWidth + carouselShift);
        setGoal(window.innerWidth + carouselShift);
        setIsGoalAchieved(false);
        setStartMouse(endCords);
      } else if (
        (moveRight > 0 && timeUp <= TIME_THRESHOLD) ||
        moveRight >= CORDS_THRESHOLD
      ) {
        setTransform(ref, carouselShift - window.innerWidth);
        setGoal(carouselShift - window.innerWidth);
        setIsGoalAchieved(false);
        setStartMouse(endCords);
      } else if (!isGoalAchieved) {
        setTransform(ref, goal);
      } else {
        setTransform(ref, carouselShift);
      }

      console.log(carouselShift);

      setIsMouseDown(false);
    };

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

        setCurrentTranslate(currTranslate);
      }
    };

    return (
      <div className="carousel-track">
        {isMouseDown && <div className="carousel-move-wrapper"></div>}
        <ul ref={ref} className="carousel">
          {content.map((item, i) => (
            <li className="carousel__item" key={i}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
