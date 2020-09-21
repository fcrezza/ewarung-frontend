import React from 'react'
import {Stack, Text} from '@chakra-ui/core'

import Button from 'shared/Button'
import {Modal, ModalBody, ModalFooter} from 'shared/Modal'

function ResetConfirmation({isOpen, onClose, clearItems}) {
  const onClear = () => {
    clearItems()
    onClose()
  }

  return (
    <Modal
      title="Apakah anda ingin mereset semua data?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalBody>
        <Text>Klik "OK" untuk melanjutkan</Text>
      </ModalBody>
      <ModalFooter>
        <Stack spacing={4} isInline justifyContent="flex-end">
          <Button variantColor="red" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onClear}>OK</Button>
        </Stack>
      </ModalFooter>
    </Modal>
  )
}

export default ResetConfirmation
