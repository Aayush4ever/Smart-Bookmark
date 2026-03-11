import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import { selectTheme, selectSidebarOpen } from './redux/uiSlice';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import AddBookmarkModal from './components/AddBookmarkModal/AddBookmarkModal';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import CategoryView from './pages/CategoryView';

const AppLayout = () => {
  const theme = useSelector(selectTheme);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleOpenAdd = () => {
    setEditingBookmark(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingBookmark(null);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <Header onAddBookmark={handleOpenAdd} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${!sidebarOpen ? 'ml-0' : ''}`}>
          <Routes>
            <Route
              path="/"
              element={<Dashboard onAddBookmark={handleOpenAdd} onEditBookmark={handleOpenEdit} />}
            />
            <Route
              path="/favorites"
              element={<Favorites onAddBookmark={handleOpenAdd} onEditBookmark={handleOpenEdit} />}
            />
            <Route
              path="/category/:categoryId"
              element={<CategoryView onEditBookmark={handleOpenEdit} />}
            />
          </Routes>
        </main>
      </div>

      <AddBookmarkModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        editingBookmark={editingBookmark}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          style: {
            borderRadius: '12px',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#6474f1',
              secondary: '#fff',
            },
          },
          duration: 2500,
        }}
      />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
