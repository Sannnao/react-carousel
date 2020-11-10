import React, { useState, useEffect } from 'react';
import './carousel.css';

export const Carousel = React.forwardRef(({ content }, ref) => {
  const [carouselContent, setCarouselContent] = useState(content);

  useEffect(() => {
    const onTransitionEnd = () => {
      const newContent = [...content];
      const firstItem = newContent.shift();
      newContent.push(firstItem);
      if (firstItem === content[0]){
        ref.current.style.transition = 'transformX(0)';
      }
      console.log(newContent);

      setCarouselContent(newContent);
    }

    window.addEventListener('transitionend', onTransitionEnd);
    return () => window.removeEventListener('transitionend', onTransitionEnd);
  })

  console.log(carouselContent);

  return (
    <ul ref={ref} className='carousel'>
      {
        carouselContent.map((item, i) => <li className='carousel__item' key={i}>{ item }</li>)
      }
    </ul>
  )
});
