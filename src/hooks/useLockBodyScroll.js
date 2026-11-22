import { useEffect } from 'react'

/** Prevents the page behind a modal from scrolling while `locked` is true. */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const { overflow, paddingRight } = document.body.style
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}
