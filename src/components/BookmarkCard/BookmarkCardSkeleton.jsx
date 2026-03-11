import React from 'react';

const BookmarkCardSkeleton = () => {
  return (
    <div className="bookmark-card overflow-hidden">
      {/* Image skeleton */}
      <div className="skeleton h-36 w-full" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Domain */}
        <div className="skeleton h-3 w-24 rounded-full" />

        {/* Title */}
        <div className="space-y-1.5">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-5/6 rounded" />
        </div>

        {/* Tags */}
        <div className="flex gap-1.5">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-14 rounded-full" />
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-12 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BookmarkCardSkeleton;
