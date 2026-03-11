import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectSearchQuery } from '../../redux/bookmarkSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1 max-w-xl">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search bookmarks by title, domain, or tag..."
        className="input-field pl-10 pr-10"
      />

      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {searchQuery && (
        <div className="absolute top-full left-0 mt-1 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-card border border-gray-100 dark:border-gray-700">
          Searching for: <span className="text-brand-600 dark:text-brand-400 font-medium">"{searchQuery}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
