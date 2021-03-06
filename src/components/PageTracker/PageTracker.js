import React, { useState, useEffect } from 'react';
import './page-tracker.css';

export const PageTracker = ({ pagesCount, chooseCurrentPage, currentPage }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage])

  const handleInputValue = (e) => {
    const value = e.target.value;

    if (typeof +value === 'number' && !isNaN(+value)) {
      setInputValue(value);
    }
  }

  const submitCurrentPage = (e) => {
    e.preventDefault();
    chooseCurrentPage(inputValue);
  }

  const switchPage = (page) => {
    chooseCurrentPage(page);
  }

  return (
    <div className="page-tracker">
      <ul className="page-tracker__pages">
        {
          new Array(pagesCount).fill('').map((_, i) => {
            const isCurrent = i + 1 === currentPage;
            return (
              <li key={i} className='page-tracker__round' onClick={() => switchPage(i + 1)}>
                {isCurrent ? <div className='page-tracker__round--current'></div> : null}
              </li>
            )
          })
        }
      </ul>
      <form onSubmit={submitCurrentPage}>
        <input className="page-tracker__input" onChange={handleInputValue} value={inputValue} />
      </form>
    </div>
  )
}
