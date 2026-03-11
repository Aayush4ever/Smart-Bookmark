import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, toggleSidebar, setViewMode, selectTheme, selectViewMode } from '../../redux/uiSlice';
import SearchBar from '../SearchBar/SearchBar';

const Header = ({ onAddBookmark }) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const viewMode = useSelector(selectViewMode);

  return (
    <header className="h-16 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex items-center gap-4 px-5 sticky top-0 z-30">
      {/* Sidebar Toggle */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="btn-ghost p-2 rounded-xl"
        title="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Logo (shown when sidebar is closed) */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </div>
      </div>

      {/* Search */}
      <SearchBar />

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto flex-shrink-0">
        {/* View mode toggle */}
        <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => dispatch(setViewMode('grid'))}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            title="Grid view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => dispatch(setViewMode('list'))}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-white dark:bg-gray-700 text-brand-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            title="List view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="btn-ghost p-2 rounded-xl"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>

        {/* Add Bookmark */}
        <button onClick={onAddBookmark} className="btn-primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:block">Add Bookmark</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
