import { createSlice, nanoid } from '@reduxjs/toolkit';

const DEFAULT_CATEGORIES = [
  { id: 'articles', name: 'Articles', icon: '📄', color: '#6474f1', isDefault: true },
  { id: 'videos', name: 'Videos', icon: '🎬', color: '#ef4444', isDefault: true },
  { id: 'code', name: 'Code', icon: '💻', color: '#10b981', isDefault: true },
  { id: 'tools', name: 'Tools', icon: '🛠️', color: '#f59e0b', isDefault: true },
  { id: 'design', name: 'Design', icon: '🎨', color: '#ec4899', isDefault: true },
  { id: 'research', name: 'Research', icon: '🔬', color: '#8b5cf6', isDefault: true },
];

const initialState = {
  categories: DEFAULT_CATEGORIES,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: {
      reducer(state, action) {
        state.categories.push(action.payload);
      },
      prepare({ name, icon = '📁', color = '#6474f1' }) {
        return {
          payload: {
            id: nanoid(),
            name,
            icon,
            color,
            isDefault: false,
          },
        };
      },
    },

    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload || c.isDefault
      );
    },

    updateCategory(state, action) {
      const { id, ...changes } = action.payload;
      const index = state.categories.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...changes };
      }
    },
  },
});

// Selectors
export const selectAllCategories = (state) => state.categories.categories;

export const selectCategoryById = (id) => (state) =>
  state.categories.categories.find((c) => c.id === id);

export const selectBookmarkCountByCategory = (categoryId) => (state) =>
  state.bookmarks.bookmarks.filter((b) => b.category === categoryId).length;

export const { addCategory, deleteCategory, updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
