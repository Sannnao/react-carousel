import React from 'react'
import './pagination.css';

export const Pagination = ({ handlePrev, handleNext }) => {
  return (
    <div className='pagination'>
      <button
        className='pagination__btn'
        onClick={handlePrev}
      >
        {'<'}
      </button>
      <button
        className='pagination__btn'
        onClick={handleNext}
      >
        {'>'}
      </button>
    </div>
  )
}
