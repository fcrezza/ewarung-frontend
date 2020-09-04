import {useState} from 'react'

function useDisclosure() {
  const [isOpen, setOpenState] = useState({
    state: false,
    type: ''
  })

  const onClose = () => {
    setOpenState((state) => ({
      type: '',
      state: false
    }))
  }

  const onOpen = (type) => {
    setOpenState((state) => ({
      type,
      state: true
    }))
  }

  return {isOpen, onOpen, onClose}
}

export default useDisclosure
