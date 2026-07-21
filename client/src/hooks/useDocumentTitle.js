import { useEffect } from 'react';

const SITE_NAME = 'Tastevo';

/**
 * Set the document <title> for the lifetime of a page component and restore
 * the previous title on unmount.
 *
 * Pass the page-specific part only — the site name is appended automatically,
 * so `useDocumentTitle('Our Menu')` produces "Our Menu | Tastevo". Pass a
 * falsy value to fall back to the bare site name.
 *
 * Centralises the pattern that previously lived only in the 404 page so every
 * route gets a descriptive, shareable title instead of the static default.
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
