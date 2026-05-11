import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) return JSON.parse(stored)
    } catch {
      // fall through to initial value on parse error
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage may be full or unavailable; ignore
    }
  }, [key, value])

  return [value, setValue]
}
