# 🔖 Smart Bookmark Manager

A modern, full-featured bookmark manager built with React, Redux Toolkit, and Tailwind CSS. Save, organize, search, and revisit your web resources — all stored locally in your browser.

- Live at  : https://smart-bookmark-three-mocha.vercel.app/
---

## ✨ Features

- **Auto Metadata Fetching** — paste a URL and get title, description, preview image, favicon automatically
- **Drag & Drop** — rearrange bookmarks with `react-beautiful-dnd`
- **Categories & Tags** — organize bookmarks with built-in and custom categories + flexible tagging
- **Smart Search** — instant full-text search across title, domain, and tags
- **Favorites** — star bookmarks and view them in a dedicated section
- **Dark Mode** — beautiful light/dark themes with persistence
- **LocalStorage Persistence** — all data survives page refresh
- **Grid & List Views** — switch between card grid and compact list
- **Toast Notifications** — friendly feedback for all actions
- **Skeleton Loading** — smooth loading states
- **Empty State UI** — contextual empty states for all views

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | UI framework + build tool |
| Redux Toolkit | State management |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Utility-first styling |
| Axios | HTTP requests for metadata |
| react-beautiful-dnd | Drag and drop |
| react-hot-toast | Toast notifications |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AddBookmarkModal/   # Modal form for adding/editing bookmarks
│   ├── BookmarkCard/       # Card component + skeleton
│   ├── BookmarkGrid/       # Grid/list view with drag-and-drop
│   ├── CategoryList/       # Category overview grid
│   ├── EmptyState/         # Context-aware empty states
│   ├── Header/             # Top navigation bar
│   ├── SearchBar/          # Search input with clear
│   ├── Sidebar/            # Navigation sidebar
│   └── TagFilter/          # Horizontal tag filter bar
├── pages/
│   ├── Dashboard.jsx       # Main view (All bookmarks)
│   ├── Favorites.jsx       # Starred bookmarks
│   └── CategoryView.jsx    # Category-filtered view
├── redux/
│   ├── store.js            # Redux store + localStorage middleware
│   ├── bookmarkSlice.js    # Bookmark state + selectors
│   ├── categorySlice.js    # Category state
│   └── uiSlice.js          # Theme, sidebar, view state
├── hooks/
│   └── useLocalStorage.js  # localStorage sync hook
├── utils/
│   ├── fetchMetadata.js    # Link preview fetching (jsonlink.io + microlink)
│   └── formatDate.js       # Relative date formatting
├── App.jsx                 # Root component + layout
├── main.jsx                # Entry point
└── index.css               # Global styles + Tailwind layers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Navigate to the project
cd smart-bookmark-manager

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔧 Redux State Shape

```js
{
  bookmarks: {
    bookmarks: [...],     // Array of bookmark objects
    searchQuery: '',      // Current search string
    selectedTag: null,    // Currently active tag filter
  },
  categories: {
    categories: [...],    // Array of category objects
  },
  ui: {
    theme: 'light',       // 'light' | 'dark'
    sidebarOpen: true,
    activeView: 'all',    // 'all' | 'favorites' | 'category'
    activeCategory: null, // Category ID string
    viewMode: 'grid',     // 'grid' | 'list'
  }
}
```

### Bookmark Schema

```js
{
  id: 'nanoid',
  url: 'https://...',
  title: 'Page title',
  description: 'Meta description',
  domain: 'example.com',
  image: 'https://...preview-image.jpg',
  favicon: 'https://...favicon.png',
  siteName: 'Example',
  category: 'articles',   // category ID
  tags: ['react', 'tutorial'],
  notes: 'Personal note',
  favorite: false,
  createdAt: '2024-01-01T00:00:00.000Z',
}
```

---

## 🌐 Metadata API

The app uses two metadata APIs in sequence with graceful fallback:

1. **Primary**: [jsonlink.io](https://jsonlink.io) — free, no API key needed
2. **Fallback**: [microlink.io](https://microlink.io) — free tier available  
3. **Final fallback**: Basic URL parsing (domain name, favicon via Google)

---

## 🎨 Design System

- **Fonts**: Syne (display) + DM Sans (body) + JetBrains Mono (code)
- **Primary Color**: Brand indigo (`#6474f1`)
- **Dark Mode**: Class-based (`dark:` prefix)
- **Animations**: CSS keyframes + Tailwind custom animations

---

## 📦 Available Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 💡 Usage Tips

- **Paste a URL** in the Add Bookmark modal — metadata loads automatically after ~800ms
- **Drag cards** to reorder within any view
- **Click a tag** in the sidebar or tag filter to filter bookmarks
- **Star icon** on hover or in the card menu toggles favorites
- **⌘+K / Ctrl+K** — focus the search bar (click the search bar to search)
- All data is **stored in LocalStorage** — no account or backend required
