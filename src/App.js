import React, { useRef } from 'react';
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

import {
  Carousel,
  Pagination,
} from './components';

export const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef(null);
  const content = [
    <div>{text}</div>,
    <img style={{ height: '100%' }} src={imageAdress} alt='A Mysterious girl' />
  ]

  const handlePrev = () => {

  }

  const handleNext = () => {
    setCurrentPage(currentPage => currentPage + 1);
    carouselRef.current.style.transform = `translateX(-${100 * currentPage}%)`;
  }

  return (
    <div className='app'>
      <Carousel
        ref={carouselRef}
        content={content}
      />
      <Pagination
        handleNext={handleNext}
      />
    </div>
  )
};
