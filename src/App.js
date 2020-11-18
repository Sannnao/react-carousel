import React, { useState, useEffect, useRef } from 'react';
import { setTransform } from './utils/setTransform';
import './app.css';

import {
  Carousel,
  Pagination,
  PageTracker,
} from './components';

export const App = ({ content }) => {
  const [carouselContent, setCarouselContent] = useState(content);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const carouselRef = useRef(null);
  const prevWindowWidth = useRef();

  useEffect(() => {
    setTransform(carouselRef, currentPage * windowWidth);
  }, [currentPage])

  useEffect(() => {
    carouselRef.current.style.transition = 'none';
    setTransform(carouselRef, currentPage * windowWidth);
  }, [windowWidth])

  useEffect(() => {
    const handleFullScreen = () => {
      if (document.fullscreenElement) {
        prevWindowWidth.current = windowWidth;
      } else {
        setWindowWidth(prevWindowWidth.current);
      }
    }
    window.addEventListener('fullscreenchange', handleFullScreen)

    return () => {
      window.removeEventListener('fullscreenchange', handleFullScreen)
    }
  })

  useEffect(() => {
    const handleWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowWidth);

    return () => window.removeEventListener('resize', handleWindowWidth);
  }, [currentPage, windowWidth])

  useEffect(() => {
    const handleCornerPages = () => {
      if (currentPage === 0) {
        const lastPage = content.length;
        const carouselStyle = carouselRef.current.style;
        carouselStyle.transition = 'none';
        setTransform(carouselRef, lastPage * windowWidth);
        setCurrentPage(lastPage);
      }
      if (currentPage > content.length) {
        const resetPage = 1;
        const carouselStyle = carouselRef.current.style;
        carouselStyle.transition = 'none';
        setTransform(carouselRef, resetPage * windowWidth);
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
    setCarouselContent(carouselContent => {
      const newContent = [...carouselContent];
      const firstItem = content[0];
      const lastItem = content[content.length - 1];
      newContent.unshift(lastItem);
      newContent.push(firstItem);

      return newContent;
    });

    carouselRef.current.style.transition = 'none';
    setTransform(carouselRef, currentPage * windowWidth);
  }, [])

  const handlePrev = () => {
    setCurrentPage(currentPage => currentPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currentPage => currentPage + 1);
  }

  const chooseCurrentPage = (newCurrentPage) => {
    const contentLength = content.length;
    carouselRef.current.style.transition = 'none';

    if (newCurrentPage >= 1 && newCurrentPage <= contentLength) {
      setCurrentPage(newCurrentPage)
    } else if (newCurrentPage > contentLength) {
      setCurrentPage(contentLength)
    } else if (newCurrentPage < 1) {
      setCurrentPage(1)
    }
  }

  const getTrueCurrentPage = () => {
    if (currentPage > content.length) {
      return 1;
    }
    if (currentPage < 1) {
      return content.length;
    }

    return currentPage;
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
      <PageTracker pagesCount={content.length} currentPage={getTrueCurrentPage()} chooseCurrentPage={chooseCurrentPage} />
    </div>
  )
};
