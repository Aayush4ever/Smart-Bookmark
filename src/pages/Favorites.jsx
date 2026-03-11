import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveView } from '../redux/uiSlice';
import BookmarkGrid from '../components/BookmarkGrid/BookmarkGrid';
import EmptyState from '../components/EmptyState/EmptyState';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../redux/bookmarkSlice';

const Favorites = ({ onAddBookmark, onEditBookmark }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(setActiveView('favorites'));
  }, [dispatch]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-gray-100">Favorites</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{favorites.length} starred</p>
          </div>
        </div>

        <BookmarkGrid onEditBookmark={onEditBookmark} />
      </div>
    </div>
  );
};

export default Favorites;
