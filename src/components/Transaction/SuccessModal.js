import React from 'react'
import {Text} from '@chakra-ui/core'

import Button from 'shared/Button'
import {Modal, ModalBody, ModalFooter} from 'shared/Modal'

function SuccessModal({isOpen, onClose, clearItems}) {
  return (
    <Modal title="Transaksi berhasil" isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <Text>Transaksi telah berhasil, dan data telah disimpan</Text>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>OK</Button>
      </ModalFooter>
    </Modal>
  )
}

export default SuccessModal
