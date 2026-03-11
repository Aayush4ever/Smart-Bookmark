import axios from 'axios';

/**
 * Extract domain from URL
 */
export function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Generate favicon URL from domain
 */
export function getFaviconUrl(domain) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

/**
 * Fetch link preview metadata using jsonlink.io API
 * Falls back to basic URL parsing if API fails
 */
export async function fetchMetadata(url) {
  if (!url || !url.startsWith('http')) {
    throw new Error('Invalid URL. Must start with http:// or https://');
  }

  const domain = extractDomain(url);
  const favicon = getFaviconUrl(domain);

  try {
    // Primary: jsonlink.io (free, no API key required)
    const response = await axios.get(
      `https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`,
      { timeout: 8000 }
    );

    const data = response.data;

    return {
      url,
      domain,
      favicon,
      title: data.title || domain,
      description: data.description || '',
      image: data.images?.[0] || null,
      siteName: data.name || domain,
    };
  } catch (primaryError) {
    console.warn('Primary metadata fetch failed, trying fallback:', primaryError.message);

    try {
      // Fallback: microlink.io
      const response = await axios.get(
        `https://api.microlink.io?url=${encodeURIComponent(url)}`,
        { timeout: 8000 }
      );

      const data = response.data?.data;

      return {
        url,
        domain,
        favicon,
        title: data?.title || domain,
        description: data?.description || '',
        image: data?.image?.url || data?.screenshot?.url || null,
        siteName: data?.publisher || domain,
      };
    } catch (fallbackError) {
      console.warn('Fallback metadata fetch also failed:', fallbackError.message);

      // Final fallback: return basic metadata from URL
      return {
        url,
        domain,
        favicon,
        title: domain,
        description: '',
        image: null,
        siteName: domain,
      };
    }
  }
}

/**
 * Validate that a string is a valid URL
 */
export function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Auto-add https:// if missing
 */
export function normalizeUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}
