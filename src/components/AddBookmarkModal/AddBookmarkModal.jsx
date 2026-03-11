import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addBookmark, updateBookmark } from '../../redux/bookmarkSlice';
import { selectAllCategories } from '../../redux/categorySlice';
import { fetchMetadata, isValidUrl, normalizeUrl } from '../../utils/fetchMetadata';

const AddBookmarkModal = ({ isOpen, onClose, editingBookmark }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [metaError, setMetaError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const urlInputRef = useRef(null);
  const fetchTimeoutRef = useRef(null);
  const isEditing = !!editingBookmark;

  // Populate form when editing
  useEffect(() => {
    if (editingBookmark) {
      setUrl(editingBookmark.url || '');
      setTitle(editingBookmark.title || '');
      setDescription(editingBookmark.description || '');
      setCategory(editingBookmark.category || '');
      setTags(editingBookmark.tags || []);
      setNotes(editingBookmark.notes || '');
      setMetadata({
        image: editingBookmark.image,
        favicon: editingBookmark.favicon,
        domain: editingBookmark.domain,
        siteName: editingBookmark.siteName,
      });
    } else {
      resetForm();
    }
  }, [editingBookmark, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => urlInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const resetForm = () => {
    setUrl('');
    setTitle('');
    setDescription('');
    setCategory('');
    setTagInput('');
    setTags([]);
    setNotes('');
    setMetadata(null);
    setMetaError('');
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setMetaError('');

    // Debounce metadata fetch
    clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(() => {
      const normalized = normalizeUrl(value.trim());
      if (normalized && isValidUrl(normalized)) {
        triggerMetadataFetch(normalized);
      }
    }, 800);
  };

  const handleUrlBlur = () => {
    const normalized = normalizeUrl(url.trim());
    if (normalized && isValidUrl(normalized)) {
      setUrl(normalized);
      if (!metadata) {
        triggerMetadataFetch(normalized);
      }
    }
  };

  const triggerMetadataFetch = async (normalizedUrl) => {
    setIsFetchingMeta(true);
    setMetaError('');
    try {
      const meta = await fetchMetadata(normalizedUrl);
      setMetadata(meta);
      if (!title) setTitle(meta.title || '');
      if (!description) setDescription(meta.description || '');
    } catch (err) {
      setMetaError('Could not fetch page preview. You can still save manually.');
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async () => {
    const normalizedUrl = normalizeUrl(url.trim());
    if (!normalizedUrl || !isValidUrl(normalizedUrl)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsSubmitting(true);

    const bookmarkData = {
      url: normalizedUrl,
      title: title || metadata?.title || metadata?.domain || normalizedUrl,
      description: description || metadata?.description || '',
      category,
      tags,
      notes,
      image: metadata?.image || null,
      favicon: metadata?.favicon || null,
      domain: metadata?.domain || new URL(normalizedUrl).hostname.replace('www.', ''),
      siteName: metadata?.siteName || '',
    };

    try {
      if (isEditing) {
        dispatch(updateBookmark({ id: editingBookmark.id, ...bookmarkData }));
        toast.success('Bookmark updated!');
      } else {
        dispatch(addBookmark(bookmarkData));
        toast.success('Bookmark saved!');
      }
      onClose();
      resetForm();
    } catch (err) {
      toast.error('Failed to save bookmark');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    clearTimeout(fetchTimeoutRef.current);
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-modal w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-display font-bold text-lg text-gray-900 dark:text-gray-100">
            {isEditing ? 'Edit Bookmark' : 'Add Bookmark'}
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* URL Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              URL *
            </label>
            <div className="relative">
              <input
                ref={urlInputRef}
                type="url"
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                placeholder="https://example.com"
                className="input-field pr-10"
              />
              {isFetchingMeta && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            {metaError && (
              <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">{metaError}</p>
            )}
          </div>

          {/* Metadata Preview */}
          {metadata && (
            <div className="rounded-xl border border-brand-100 dark:border-brand-900/40 bg-brand-50/50 dark:bg-brand-950/20 overflow-hidden animate-slide-in">
              {metadata.image && (
                <div className="h-28 overflow-hidden">
                  <img
                    src={metadata.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="p-3 flex items-start gap-2.5">
                {metadata.favicon && (
                  <img src={metadata.favicon} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" onError={(e) => e.target.remove()} />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate">{metadata.domain}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{metadata.title}</p>
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title (auto-filled)"
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description (auto-filled)"
              rows={2}
              className="input-field resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Tags
            </label>
            <div className="input-field min-h-[42px] flex flex-wrap gap-1.5 cursor-text"
              onClick={() => document.getElementById('tag-input')?.focus()}
            >
              {tags.map((tag) => (
                <span key={tag} className="tag-pill flex items-center gap-1">
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                id="tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={tags.length === 0 ? 'Type and press Enter or comma' : ''}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Personal notes about this bookmark..."
              rows={2}
              className="input-field resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-5 border-t border-gray-100 dark:border-gray-800">
          <button onClick={handleClose} className="btn-ghost flex-1 justify-center">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !url.trim()}
            className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {isEditing ? 'Update' : 'Save Bookmark'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookmarkModal;
