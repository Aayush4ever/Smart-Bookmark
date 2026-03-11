import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../redux/uiSlice';
import { selectCategoryById } from '../redux/categorySlice';
import { selectAllBookmarks } from '../redux/bookmarkSlice';
import BookmarkGrid from '../components/BookmarkGrid/BookmarkGrid';
import EmptyState from '../components/EmptyState/EmptyState';

const CategoryView = ({ onEditBookmark }) => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const category = useSelector(selectCategoryById(categoryId));
  const allBookmarks = useSelector(selectAllBookmarks);
  const categoryCount = allBookmarks.filter((b) => b.category === categoryId).length;

  useEffect(() => {
    dispatch(setActiveCategory(categoryId));
  }, [categoryId, dispatch]);

  if (!category) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Category not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: `${category.color}20` }}
          >
            {category.icon}
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-gray-100">
              {category.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {categoryCount} {categoryCount === 1 ? 'bookmark' : 'bookmarks'}
            </p>
          </div>
        </div>

        <BookmarkGrid onEditBookmark={onEditBookmark} />
      </div>
    </div>
  );
};

export default CategoryView;
