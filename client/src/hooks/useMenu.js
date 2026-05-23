import { useState, useEffect, useCallback } from 'react';
import menuFallback from '../data/menuFallback';

const BASE_URL = '/api';

/**
 * Fetches the full menu grouped by category.
 * Falls back to hardcoded data on network/server error.
 *
 * Returns:
 *   menuData    — { starters, mains, desserts, drinks }
 *   loading     — true while first fetch is in flight
 *   error       — error message string, or null
 *   isFallback  — true when data comes from the local fallback
 *   refetch     — call this to retry the API manually
 */
export const useMenu = () => {
  const [menuData, setMenuData]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [isFallback, setIsFallback]   = useState(false);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/menu`);

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.error || 'Failed to load menu.');
      }

      setMenuData(json.data);
      setIsFallback(false);
    } catch (err) {
      console.warn('[useMenu] API unavailable, using fallback data:', err.message);
      setMenuData(menuFallback);
      setIsFallback(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return { menuData, loading, error, isFallback, refetch: fetchMenu };
};

/**
 * Fetches up to 4 featured / popular items for the Home page.
 * Falls back to the 4 most popular items from the local fallback.
 *
 * Returns:
 *   featuredItems — flat array of up to 4 items
 *   loading       — true while first fetch is in flight
 *   error         — error message string, or null
 *   isFallback    — true when data comes from the local fallback
 */
export const useFeaturedItems = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [isFallback, setIsFallback]       = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BASE_URL}/menu/featured`);

        if (!res.ok) throw new Error(`Server error ${res.status}`);

        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load featured items.');

        if (!cancelled) {
          setFeaturedItems(json.data);
          setIsFallback(false);
        }
      } catch (err) {
        console.warn('[useFeaturedItems] API unavailable, using fallback:', err.message);
        if (!cancelled) {
          // Pick up to 4 isPopular items across all categories from the fallback
          const all = Object.values(menuFallback).flat();
          const popular = all.filter(i => i.isPopular).slice(0, 4);
          setFeaturedItems(popular);
          setIsFallback(true);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFeatured();
    return () => { cancelled = true; };
  }, []);

  return { featuredItems, loading, error, isFallback };
};
