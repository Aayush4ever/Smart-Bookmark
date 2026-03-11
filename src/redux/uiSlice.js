import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  sidebarOpen: true,
  activeView: 'all', // 'all' | 'favorites' | 'category'
  activeCategory: null,
  viewMode: 'grid', // 'grid' | 'list'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    setTheme(state, action) {
      state.theme = action.payload;
    },

    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setActiveView(state, action) {
      state.activeView = action.payload;
      if (action.payload !== 'category') {
        state.activeCategory = null;
      }
    },

    setActiveCategory(state, action) {
      state.activeView = 'category';
      state.activeCategory = action.payload;
    },

    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
  },
});

// Selectors
export const selectTheme = (state) => state.ui.theme;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectActiveView = (state) => state.ui.activeView;
export const selectActiveCategory = (state) => state.ui.activeCategory;
export const selectViewMode = (state) => state.ui.viewMode;

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setActiveView,
  setActiveCategory,
  setViewMode,
} = uiSlice.actions;

export default uiSlice.reducer;
