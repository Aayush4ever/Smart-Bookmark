import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: [],
  searchQuery: '',
  selectedTag: null,
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: {
      reducer(state, action) {
        state.bookmarks.unshift(action.payload);
      },
      prepare(bookmarkData) {
        return {
          payload: {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            favorite: false,
            order: 0,
            tags: [],
            notes: '',
            ...bookmarkData,
          },
        };
      },
    },

    deleteBookmark(state, action) {
      state.bookmarks = state.bookmarks.filter((b) => b.id !== action.payload);
    },

    updateBookmark(state, action) {
      const { id, ...changes } = action.payload;
      const index = state.bookmarks.findIndex((b) => b.id === id);
      if (index !== -1) {
        state.bookmarks[index] = { ...state.bookmarks[index], ...changes };
      }
    },

    toggleFavorite(state, action) {
      const bookmark = state.bookmarks.find((b) => b.id === action.payload);
      if (bookmark) {
        bookmark.favorite = !bookmark.favorite;
      }
    },

    reorderBookmarks(state, action) {
      state.bookmarks = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    setSelectedTag(state, action) {
      state.selectedTag = action.payload === state.selectedTag ? null : action.payload;
    },
  },
});

// Selectors
export const selectAllBookmarks = (state) => state.bookmarks.bookmarks;

export const selectFilteredBookmarks = (state) => {
  const { bookmarks, searchQuery, selectedTag } = state.bookmarks;
  const { activeView, activeCategory } = state.ui;

  let filtered = [...bookmarks];

  // Filter by view
  if (activeView === 'favorites') {
    filtered = filtered.filter((b) => b.favorite);
  } else if (activeView === 'category' && activeCategory) {
    filtered = filtered.filter((b) => b.category === activeCategory);
  }

  // Filter by tag
  if (selectedTag) {
    filtered = filtered.filter((b) => b.tags && b.tags.includes(selectedTag));
  }

  // Filter by search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title?.toLowerCase().includes(query) ||
        b.domain?.toLowerCase().includes(query) ||
        b.description?.toLowerCase().includes(query) ||
        b.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }

  return filtered;
};

export const selectFavorites = (state) =>
  state.bookmarks.bookmarks.filter((b) => b.favorite);

export const selectAllTags = (state) => {
  const tags = new Set();
  state.bookmarks.bookmarks.forEach((b) => b.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
};

export const selectSearchQuery = (state) => state.bookmarks.searchQuery;
export const selectSelectedTag = (state) => state.bookmarks.selectedTag;

export const {
  addBookmark,
  deleteBookmark,
  updateBookmark,
  toggleFavorite,
  reorderBookmarks,
  setSearchQuery,
  setSelectedTag,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
