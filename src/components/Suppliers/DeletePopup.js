import React from 'react'
import {Box, Stack, Button} from '@chakra-ui/core'

import Modal from 'shared/Modal'

function DeletePopup({onClose, isOpen, deleteFn, items}) {
  const onDelete = () => {
    /*
      batch delete logic here
    */
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Yakin menghapus data?">
      <Box>{items.length} data akan dihapus</Box>
      <Stack marginTop="6" marginBottom="4" spacing="4" isInline>
        <Button variantColor="gray" onClick={onClose}>
          Batal
        </Button>
        <Button variantColor="red" onClick={onDelete}>
          Hapus
        </Button>
      </Stack>
    </Modal>
  )
}

export default DeletePopup
