import React from 'react'
import './pagination.css';

export const Pagination = ({ handlePrev, handleNext }) => {
  return (
    <>
      <button
        className='pagination__btn pagination__btn--left'
        onClick={handlePrev}
      >
        {'<'}
      </button>
      <button
        className='pagination__btn pagination__btn--right'
        onClick={handleNext}
      >
        {'>'}
      </button>
    </>
  )
}
