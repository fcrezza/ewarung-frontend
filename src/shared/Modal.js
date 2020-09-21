import React from 'react'
import {
  Modal as ChakraModal,
  ModalHeader as ChakraModalHeader,
  ModalBody as ChakraModalBody,
  ModalFooter as ChakraModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/core'

export function Modal({isOpen, onClose, title, children}) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ChakraModalHeader>{title}</ChakraModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export function ModalBody({children}) {
  return <ChakraModalBody>{children}</ChakraModalBody>
}

export function ModalFooter({children}) {
  return <ChakraModalFooter>{children}</ChakraModalFooter>
}
