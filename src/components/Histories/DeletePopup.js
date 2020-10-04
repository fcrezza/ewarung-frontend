import React from 'react'
import {Box, Stack, Button} from '@chakra-ui/core'

import {Modal, ModalBody, ModalFooter} from 'shared/Modal'

function DeletePopup({onClose, isOpen, onDelete, itemLength}) {
  const [isLoading, setLoading] = React.useState(false)

  const onClick = async () => {
    setLoading(true)
    await onDelete()
    setLoading(false)
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Yakin menghapus data?">
      <ModalBody>
        <Box>
          {itemLength} data akan dihapus. Data anda akan dihapus secara
          permananen, klik "Hapus" untuk melanjutkan.
        </Box>
      </ModalBody>
      <ModalFooter>
        <Stack marginTop="6" marginBottom="4" spacing="4" isInline>
          <Button variantColor="gray" isDisabled={isLoading} onClick={onClose}>
            Batal
          </Button>
          <Button variantColor="red" isDisabled={isLoading} onClick={onClick}>
            Hapus
          </Button>
        </Stack>
      </ModalFooter>
    </Modal>
  )
}

export default DeletePopup
