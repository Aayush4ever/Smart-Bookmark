import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllCategories } from '../../redux/categorySlice';
import { selectAllBookmarks } from '../../redux/bookmarkSlice';
import { setActiveCategory } from '../../redux/uiSlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategories);
  const bookmarks = useSelector(selectAllBookmarks);

  const getCategoryCount = (categoryId) =>
    bookmarks.filter((b) => b.category === categoryId).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {categories.map((cat) => {
        const count = getCategoryCount(cat.id);
        return (
          <button
            key={cat.id}
            onClick={() => {
              dispatch(setActiveCategory(cat.id));
              navigate(`/category/${cat.id}`);
            }}
            className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-card transition-all duration-200 text-left group"
          >
            <div className="text-2xl mb-2">{cat.icon}</div>
            <div className="font-display font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {cat.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">
              {count} {count === 1 ? 'item' : 'items'}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryList;
