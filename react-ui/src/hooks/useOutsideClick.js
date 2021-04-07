import { useEffect } from 'react'

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target) || e.key === 'Escape') {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClick
