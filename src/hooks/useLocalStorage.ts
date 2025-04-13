import { useState, useEffect, Dispatch } from 'react';

/**
 * Stores objects in the browser's local storage
 *
 * @param key item key
 * @param initialValue item initial value
 * @returns state value and state setter
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<T>] => {
  const [value, setValue] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(key);
      return localValue ? (JSON.parse(localValue) as T) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
