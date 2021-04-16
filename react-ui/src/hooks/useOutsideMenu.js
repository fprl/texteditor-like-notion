import { useEffect } from 'react'

const useOutsideMenu = (ref, callback) => {
  const handleKeyUp = e => {
    if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'Backspace' || e.key === '/') {
      callback()
      return
    }
  }

  useEffect(() => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('keyup', handleKeyUp)
    window.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('click', handleClick)
    }
  })
}

export { useOutsideMenu }
