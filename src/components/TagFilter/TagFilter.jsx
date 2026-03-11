import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTags, selectSelectedTag, setSelectedTag } from '../../redux/bookmarkSlice';

const TagFilter = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectAllTags);
  const selectedTag = useSelector(selectSelectedTag);

  if (tags.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Tags:</span>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => dispatch(setSelectedTag(tag))}
          className={`tag-pill cursor-pointer transition-all duration-150 ${
            selectedTag === tag ? 'active' : 'hover:bg-brand-100 dark:hover:bg-brand-900/40'
          }`}
        >
          #{tag}
        </button>
      ))}
      {selectedTag && (
        <button
          onClick={() => dispatch(setSelectedTag(null))}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default TagFilter;
