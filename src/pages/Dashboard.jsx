import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredBookmarks, selectAllBookmarks, selectSearchQuery, selectSelectedTag } from '../redux/bookmarkSlice';
import { selectActiveView, selectActiveCategory } from '../redux/uiSlice';
import { selectAllCategories } from '../redux/categorySlice';
import BookmarkGrid from '../components/BookmarkGrid/BookmarkGrid';
import TagFilter from '../components/TagFilter/TagFilter';
import CategoryList from '../components/CategoryList/CategoryList';
import EmptyState from '../components/EmptyState/EmptyState';

const Dashboard = ({ onAddBookmark, onEditBookmark }) => {
  const allBookmarks = useSelector(selectAllBookmarks);
  const filteredBookmarks = useSelector(selectFilteredBookmarks);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedTag = useSelector(selectSelectedTag);
  const activeView = useSelector(selectActiveView);
  const activeCategory = useSelector(selectActiveCategory);
  const categories = useSelector(selectAllCategories);

  const getPageTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (selectedTag) return `#${selectedTag}`;
    if (activeView === 'favorites') return 'Favorites';
    if (activeView === 'category' && activeCategory) {
      const cat = categories.find((c) => c.id === activeCategory);
      return cat ? `${cat.icon} ${cat.name}` : 'Category';
    }
    return 'All Bookmarks';
  };

  const getSubtitle = () => {
    const count = filteredBookmarks.length;
    return `${count} ${count === 1 ? 'bookmark' : 'bookmarks'}`;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-gray-100">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-mono">
              {getSubtitle()}
            </p>
          </div>
        </div>

        {/* Tag Filter Row */}
        {!searchQuery && <div className="mb-5"><TagFilter /></div>}

        {/* Category Overview (on All view with no filters) */}
        {activeView === 'all' && !searchQuery && !selectedTag && allBookmarks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse by Category
            </h2>
            <CategoryList />
          </div>
        )}

        {/* Bookmarks */}
        {allBookmarks.length === 0 ? (
          <EmptyState onAdd={onAddBookmark} />
        ) : (
          <BookmarkGrid onEditBookmark={onEditBookmark} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
