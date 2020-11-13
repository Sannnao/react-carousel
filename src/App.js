import React, { useState, useEffect, useRef } from 'react';
import './app.css';

const imageAdress = 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340';
const text = `T h e G i f t o f t h e M a g i
ONE DOLLAR AND EIGHTY-SEVEN CENTS.
That was all. She had put it aside, one cent and then another and then
another, in her careful buying of meat and other food. Della counted
it three times. One dollar and eighty-seven cents. And the next day
would be Christmas.
There was nothing to do but fall on the bed and cry. So Della did it.
While the lady of the home is slowly growing quieter, we can
look at the home. Furnished rooms at a cost of $8 a week. There is little more to say about it.
In the hall below was a letter-box too small to hold a letter. There
was an electric bell, but it could not make a sound. Also there was a
name beside the door: “Mr. James Dillingham Young.”`;
const secondImg = 'https://images.assetsdelivery.com/compings_v2/biletskiy/biletskiy1506/biletskiy150600086.jpg'

import {
  Carousel,
  Pagination,
} from './components';

export const App = () => {
  const content = [
    <div>{text}</div>,
    <img style={{ height: '100%' }} src={imageAdress} alt='A Mysterious girl' />,
    <img style={{ height: '100%' }} src={secondImg} alt='Beautiful field' />,
  ]
  const [carouselContent, setCarouselContent] = useState(content);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleWindowWidth = () => {
      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = `translateX(-${currentPage * windowWidth}px)`;
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowWidth);

    return () => window.removeEventListener('resize', handleWindowWidth);
  }, [])

  useEffect(() => {
    const handleCornerPages = () => {
      if (currentPage === 0) {
        const lastPage = content.length;
        const carouselStyle = carouselRef.current.style;
        carouselStyle.transition = 'none';
        carouselStyle.transform = `translateX(-${lastPage * windowWidth}px)`;
        setCurrentPage(lastPage);
      }
      if (currentPage > content.length) {
        const resetPage = 1;
        const carouselStyle = carouselRef.current.style;
        carouselStyle.transition = 'none';
        carouselStyle.transform = `translateX(-${resetPage * windowWidth}px)`;
        setCurrentPage(resetPage);
      }
    }

    window.addEventListener('transitionend', handleCornerPages)
    window.addEventListener('transitioncancel', handleCornerPages)

    return () => {
      window.removeEventListener('transitionend', handleCornerPages)
      window.removeEventListener('transitioncancel', handleCornerPages)
    }
  })

  useEffect(() => {
    console.log('currentPage', currentPage, currentPage * windowWidth);
    const carouselStyle = carouselRef.current.style;
    carouselStyle.transform = `translateX(-${currentPage * windowWidth}px)`;
  }, [currentPage])

  useEffect(() => {
    setCarouselContent(carouselContent => {
      const newContent = [...carouselContent];
      const firstItem = content[0];
      const lastItem = content[content.length - 1];
      newContent.unshift(lastItem);
      newContent.push(firstItem);

      return newContent;
    });

    carouselRef.current.style.transform = `translateX(-${currentPage * windowWidth}px)`;
  }, [])

  const handlePrev = () => {
    setCurrentPage(currentPage => currentPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currentPage => currentPage + 1);
  }

  return (
    <div className='app'>
      <Carousel
        ref={carouselRef}
        content={carouselContent}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <Pagination
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  )
};
