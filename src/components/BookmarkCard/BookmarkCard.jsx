import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteBookmark, toggleFavorite } from '../../redux/bookmarkSlice';
import { formatDate, formatFullDate } from '../../utils/formatDate';

const BookmarkCard = ({ bookmark, onEdit, isDragging }) => {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteBookmark(bookmark.id));
    toast.success('Bookmark deleted');
    setShowMenu(false);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(bookmark.id));
    toast.success(bookmark.favorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(bookmark);
    setShowMenu(false);
  };

  const handleOpen = () => {
    window.open(bookmark.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`bookmark-card group relative cursor-pointer ${
        isDragging ? 'shadow-card-hover rotate-1 scale-105 z-50' : ''
      }`}
      onClick={handleOpen}
    >
      {/* Image */}
      <div className="relative h-36 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950/30 dark:to-gray-800 overflow-hidden">
        {bookmark.image && !imgError ? (
          <img
            src={bookmark.image}
            alt={bookmark.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {bookmark.favicon ? (
              <img
                src={bookmark.favicon}
                alt=""
                className="w-12 h-12 opacity-40"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="text-4xl font-display font-bold text-brand-200 dark:text-brand-800 uppercase select-none">
                {bookmark.domain?.[0] || '?'}
              </div>
            )}
          </div>
        )}

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            bookmark.favorite
              ? 'bg-amber-400 text-white shadow-lg'
              : 'bg-white/80 dark:bg-gray-900/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-amber-400 backdrop-blur-sm'
          }`}
          title={bookmark.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-4 h-4" fill={bookmark.favorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>

        {/* Menu button */}
        <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="w-8 h-8 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showMenu && (
              <div
                className="absolute top-10 left-0 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-modal border border-gray-100 dark:border-gray-700 overflow-hidden animate-scale-in min-w-[140px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={handleEdit} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button onClick={handleDelete} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Site info */}
        <div className="flex items-center gap-2 mb-2.5">
          {bookmark.favicon && (
            <img
              src={bookmark.favicon}
              alt=""
              className="w-4 h-4 rounded-sm flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
            {bookmark.domain}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {bookmark.title || bookmark.domain}
        </h3>

        {/* Description */}
        {bookmark.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
            {bookmark.description}
          </p>
        )}

        {/* Notes */}
        {bookmark.notes && (
          <p className="text-xs text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 rounded-lg px-2 py-1.5 mb-3 line-clamp-2 italic">
            "{bookmark.notes}"
          </p>
        )}

        {/* Tags */}
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {bookmark.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">
                #{tag}
              </span>
            ))}
            {bookmark.tags.length > 3 && (
              <span className="tag-pill bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                +{bookmark.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <span
            className="text-xs text-gray-400 dark:text-gray-500"
            title={formatFullDate(bookmark.createdAt)}
          >
            {formatDate(bookmark.createdAt)}
          </span>

          <button
            onClick={handleOpen}
            className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium flex items-center gap-1 transition-colors"
          >
            Open
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Close menu on outside click */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default BookmarkCard;
