import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { selectFilteredBookmarks, reorderBookmarks } from '../../redux/bookmarkSlice';
import { selectViewMode } from '../../redux/uiSlice';
import BookmarkCard from '../BookmarkCard/BookmarkCard';
import EmptyState from '../EmptyState/EmptyState';

const BookmarkGrid = ({ onEditBookmark }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(selectFilteredBookmarks);
  const viewMode = useSelector(selectViewMode);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const allBookmarks = [...bookmarks];
    const [moved] = allBookmarks.splice(result.source.index, 1);
    allBookmarks.splice(result.destination.index, 0, moved);

    dispatch(reorderBookmarks(allBookmarks));
  };

  if (bookmarks.length === 0) {
    return <EmptyState />;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="bookmarks" direction={viewMode === 'list' ? 'vertical' : 'horizontal'}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
            }
          >
            {bookmarks.map((bookmark, index) => (
              <Draggable key={bookmark.id} draggableId={bookmark.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${Math.min(index * 30, 300)}ms`,
                      ...provided.draggableProps.style,
                    }}
                  >
                    {viewMode === 'grid' ? (
                      <BookmarkCard
                        bookmark={bookmark}
                        onEdit={onEditBookmark}
                        isDragging={snapshot.isDragging}
                      />
                    ) : (
                      <BookmarkListItem
                        bookmark={bookmark}
                        onEdit={onEditBookmark}
                        isDragging={snapshot.isDragging}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// List view item
const BookmarkListItem = ({ bookmark, onEdit, isDragging }) => {
  const dispatch = useDispatch();
  const [imgError, setImgError] = React.useState(false);

  const handleOpen = () => window.open(bookmark.url, '_blank', 'noopener,noreferrer');

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 p-3 cursor-pointer hover:shadow-card-hover transition-all duration-200 group ${
        isDragging ? 'shadow-card-hover' : ''
      }`}
      onClick={handleOpen}
    >
      {/* Thumbnail */}
      <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950/30 dark:to-gray-800 flex-shrink-0 overflow-hidden">
        {bookmark.image && !imgError ? (
          <img
            src={bookmark.image}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {bookmark.favicon ? (
              <img src={bookmark.favicon} alt="" className="w-6 h-6 opacity-50" onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <span className="text-brand-300 font-bold text-lg">{bookmark.domain?.[0]?.toUpperCase()}</span>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {bookmark.favicon && (
            <img src={bookmark.favicon} alt="" className="w-3.5 h-3.5 flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{bookmark.domain}</span>
          {bookmark.favorite && (
            <span className="text-amber-400 text-xs">★</span>
          )}
        </div>
        <h3 className="font-display font-semibold text-sm text-gray-900 dark:text-gray-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {bookmark.title || bookmark.domain}
        </h3>
        {bookmark.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{bookmark.description}</p>
        )}
      </div>

      {/* Tags */}
      <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
        {bookmark.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="tag-pill"># {tag}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(bookmark); }}
          className="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookmarkGrid;
