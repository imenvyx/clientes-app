import { useState, useEffect, Dispatch } from 'react';

/**
 * Stores objects in the browser's local storage
 *
 * @param key item key
 * @param initialValue item initial value
 * @returns state value and state setter
 */
export const useLocalStorage = (
  key: string,
  initialValue: unknown
): [any, Dispatch<any>] => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(key);
      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
