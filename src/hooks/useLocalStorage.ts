'use client'

import * as React from 'react'

type SetWithLocalStorage<D> = React.Dispatch<React.SetStateAction<D>>

export default function useLocalStorage<D>(key: string, defaultValue: D): [D, SetWithLocalStorage<D>] {
  const [data, setData] = React.useState<D>(defaultValue);

  const setWithLocalStorage: SetWithLocalStorage<D> = React.useCallback((value) => {
    if (typeof window === 'undefined') {
      return defaultValue
    }
    const newValue = value instanceof Function ? value(data) : value
    setData(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  }, [data, defaultValue, key])

  const readValue = React.useCallback(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined
  }, [key])

  React.useEffect(() => {
    const item = readValue()
    if (item) {
      setData(item);
    }
  }, []);

  return [data, setWithLocalStorage];
}