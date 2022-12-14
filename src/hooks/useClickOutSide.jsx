import { useEffect, useRef, useState } from 'react'

function useClickOutSide() {
  const [show, setShow] = useState(true)
  const nodeRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(event.target) &&
        !event.target.classList.contains('input-search')
      ) {
        setShow(false)
      }
      if (event.target.classList.contains('input-search')) {
        setShow(true)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return { show, nodeRef }
}
export default useClickOutSide
