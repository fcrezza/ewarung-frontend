import React from 'react'
import {PseudoBox, Box, Text, Stack, IconButton} from '@chakra-ui/core'
import useSWR from 'swr'

import OverlayScrollbar from 'shared/OverlayScrollbar'
import Button from 'shared/Button'
import {Modal, ModalBody} from 'shared/Modal'
import {InputV2} from 'shared/Input'
import useSearch from 'libs/useSearch'
import axios from 'libs/axios'

function AddItem(props) {
  const {
    isOpen,
    onClose,
    idStore,
    idItems,
    handleAddItem,
    handleRemoveItem
  } = props
  const [typedValue, searchValue, setSearchValue] = useSearch(500)
  const {data: inventory} = useSWR(`/store/${idStore}/inventories`, (url) =>
    axios
      .get(`${url}?q=${searchValue}&minStock=1`, {
        withCredentials: true
      })
      .then(({data}) => data)
  )
  const filteredInventory = inventory?.data.map((item) => {
    if (idItems.includes(item.id)) {
      item.isAdded = true
      return item
    }

    item.isAdded = false
    return item
  })

  return (
    <Modal title="Tambah item" isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <OverlayScrollbar>
          <Box maxHeight="300px">
            <InputV2
              inputLabel="Cari barang"
              onChange={({target}) => setSearchValue(target.value)}
              value={typedValue}
              placeholder="Masukan nama barang..."
            />
            <Text as="h2" fontWeight="700" marginY="4">
              Total {filteredInventory?.length} item
            </Text>
            <Box>
              {!filteredInventory ? (
                <Text>Loading...</Text>
              ) : filteredInventory.length ? (
                filteredInventory.map((inventItem) => (
                  <InventoryItem
                    key={inventItem.id}
                    name={inventItem.name}
                    stock={inventItem.stock}
                    price={inventItem.price}
                    chooseItem={handleAddItem.bind(null, inventItem)}
                    removeItem={handleRemoveItem.bind(null, inventItem.id)}
                    isAdded={inventItem.isAdded}
                  />
                ))
              ) : null}
            </Box>
          </Box>
        </OverlayScrollbar>
      </ModalBody>
    </Modal>
  )
}

function InventoryItem({name, price, stock, isAdded, chooseItem, removeItem}) {
  return (
    <PseudoBox
      display="flex"
      alignItems="center"
      padding="4"
      justifyContent="space-between"
      _hover={{
        backgroundColor: 'green.50'
      }}
    >
      <Box>
        <Text as="h3" fontWeight="700" font-size="1.3rem">
          {name}
        </Text>
        <Stack spacing="10px" isInline>
          <Text as="p">
            Stock: <strong>{stock}</strong>
          </Text>
          <Text as="p">
            Price: <strong>Rp. {price}</strong>
          </Text>
        </Stack>
      </Box>
      {isAdded ? (
        <IconButton
          icon="close"
          size="sm"
          variant="outline"
          variantColor="red"
          onClick={removeItem}
        />
      ) : (
        <Button variant="outline" onClick={chooseItem}>
          Pilih
        </Button>
      )}
    </PseudoBox>
  )
}

export default AddItem
