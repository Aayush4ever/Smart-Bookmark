import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectAllBookmarks,
  selectFavorites,
  selectAllTags,
  setSelectedTag,
  selectSelectedTag,
} from '../../redux/bookmarkSlice';
import { selectAllCategories, addCategory } from '../../redux/categorySlice';
import { setActiveView, setActiveCategory, selectActiveView, selectActiveCategory, selectSidebarOpen } from '../../redux/uiSlice';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarOpen = useSelector(selectSidebarOpen);
  const bookmarks = useSelector(selectAllBookmarks);
  const favorites = useSelector(selectFavorites);
  const tags = useSelector(selectAllTags);
  const categories = useSelector(selectAllCategories);
  const activeView = useSelector(selectActiveView);
  const activeCategory = useSelector(selectActiveCategory);
  const selectedTag = useSelector(selectSelectedTag);

  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📁');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name is required');
      return;
    }
    dispatch(addCategory({ name: newCategoryName.trim(), icon: newCategoryIcon }));
    toast.success(`Category "${newCategoryName}" created`);
    setNewCategoryName('');
    setNewCategoryIcon('📁');
    setShowNewCategory(false);
  };

  const handleNavAll = () => {
    dispatch(setActiveView('all'));
    navigate('/');
  };

  const handleNavFavorites = () => {
    dispatch(setActiveView('favorites'));
    navigate('/favorites');
  };

  const handleNavCategory = (categoryId) => {
    dispatch(setActiveCategory(categoryId));
    navigate(`/category/${categoryId}`);
  };

  const handleTagClick = (tag) => {
    dispatch(setSelectedTag(tag));
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 flex-shrink-0 h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight">
              Smart Bookmarks
            </h1>
            <p className="text-xs text-gray-400 font-mono">{bookmarks.length} saved</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Main Nav */}
        <nav className="space-y-0.5">
          <button
            onClick={handleNavAll}
            className={`sidebar-link w-full ${activeView === 'all' ? 'active' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>All Bookmarks</span>
            <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full font-mono">
              {bookmarks.length}
            </span>
          </button>

          <button
            onClick={handleNavFavorites}
            className={`sidebar-link w-full ${activeView === 'favorites' ? 'active' : ''}`}
          >
            <svg className="w-4 h-4 text-amber-400" fill={activeView === 'favorites' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>Favorites</span>
            <span className="ml-auto text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-mono">
              {favorites.length}
            </span>
          </button>
        </nav>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Categories
            </h2>
            <button
              onClick={() => setShowNewCategory(!showNewCategory)}
              className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              title="Add category"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <div className="space-y-0.5">
            {categories.map((cat) => {
              const count = bookmarks.filter((b) => b.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleNavCategory(cat.id)}
                  className={`sidebar-link w-full ${
                    activeView === 'category' && activeCategory === cat.id ? 'active' : ''
                  }`}
                >
                  <span className="text-base leading-none">{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                  {count > 0 && (
                    <span className="ml-auto text-xs font-mono text-gray-400 dark:text-gray-500">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* New category form */}
          {showNewCategory && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl animate-slide-in">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  placeholder="📁"
                  className="input-field w-12 text-center px-2"
                  maxLength={2}
                />
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category name"
                  className="input-field flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleAddCategory} className="btn-primary text-xs py-1.5 flex-1 justify-center">
                  Add
                </button>
                <button
                  onClick={() => setShowNewCategory(false)}
                  className="btn-ghost text-xs py-1.5 flex-1 justify-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-1">
              Tags
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`tag-pill cursor-pointer hover:bg-brand-600 hover:text-white transition-colors ${
                    selectedTag === tag ? 'active' : ''
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-center text-gray-400 dark:text-gray-600 font-mono">
          All data stored locally
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
