import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearchQuery, selectSelectedTag } from '../../redux/bookmarkSlice';
import { selectActiveView } from '../../redux/uiSlice';

const EmptyState = ({ onAdd }) => {
  const searchQuery = useSelector(selectSearchQuery);
  const selectedTag = useSelector(selectSelectedTag);
  const activeView = useSelector(selectActiveView);

  if (searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100 mb-1">No results found</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          No bookmarks match "<span className="text-brand-600 dark:text-brand-400 font-medium">{searchQuery}</span>". Try a different search.
        </p>
      </div>
    );
  }

  if (selectedTag) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center mb-4 text-2xl">
          🏷️
        </div>
        <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100 mb-1">No bookmarks with #{selectedTag}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add this tag to your bookmarks to see them here.
        </p>
      </div>
    );
  }

  if (activeView === 'favorites') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4 text-3xl">
          ⭐
        </div>
        <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100 mb-1">No favorites yet</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Click the star icon on any bookmark to add it to your favorites.
        </p>
      </div>
    );
  }

  if (activeView === 'category') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 text-3xl">
          📂
        </div>
        <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100 mb-1">No bookmarks in this category</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          When you add bookmarks and assign them to this category, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center">
          <svg className="w-10 h-10 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      <h3 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">
        Start your collection
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
        Save links, articles, tools, and resources you want to revisit. They'll be organized and searchable.
      </p>
      {onAdd && (
        <button onClick={onAdd} className="btn-primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add your first bookmark
        </button>
      )}
    </div>
  );
};

export default EmptyState;
