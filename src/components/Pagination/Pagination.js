import React from 'react'
import './pagination.css';

export const Pagination = ({ handlePrev, handleNext }) => {
  return (
    <div className='pagination'>
      <button onClick={handlePrev}>{'<'}</button>
      <button onClick={handleNext}>{'>'}</button>
    </div>
  )
}
