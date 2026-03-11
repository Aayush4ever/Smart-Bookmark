import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './bookmarkSlice';
import categoryReducer from './categorySlice';
import uiReducer from './uiSlice';

// LocalStorage persistence middleware
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Persist bookmarks and categories to localStorage
  try {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks.bookmarks));
    localStorage.setItem('categories', JSON.stringify(state.categories.categories));
    localStorage.setItem('theme', state.ui.theme);
  } catch (e) {
    console.warn('LocalStorage persistence failed:', e);
  }

  return result;
};

// Load initial state from localStorage
const loadState = () => {
  try {
    const bookmarks = localStorage.getItem('bookmarks');
    const categories = localStorage.getItem('categories');
    const theme = localStorage.getItem('theme');
    return {
      bookmarksData: bookmarks ? JSON.parse(bookmarks) : undefined,
      categoriesData: categories ? JSON.parse(categories) : undefined,
      theme: theme || 'light',
    };
  } catch {
    return { bookmarksData: undefined, categoriesData: undefined, theme: 'light' };
  }
};

const { bookmarksData, categoriesData, theme } = loadState();

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
    categories: categoryReducer,
    ui: uiReducer,
  },
  preloadedState: {
    bookmarks: bookmarksData
      ? { bookmarks: bookmarksData, searchQuery: '', selectedTag: null }
      : undefined,
    categories: categoriesData
      ? { categories: categoriesData }
      : undefined,
    ui: { theme, sidebarOpen: true, activeView: 'all', activeCategory: null },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
