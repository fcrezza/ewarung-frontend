import React from 'react'
import useSWR, {mutate} from 'swr'
import {
  Box,
  Flex,
  Stack,
  PseudoBox,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/core'

import AddItem from 'components/Transaction/AddItem'
import ResetConfirmation from 'components/Transaction/ResetConfirmation'
import SuccessModal from 'components/Transaction/SuccessModal'
import {Item, ItemLabel, ItemValue} from 'components/Transaction/Item'
import Dashboard from 'shared/Dashboard'
import Button from 'shared/Button'
import Data from 'shared/Data'
import useDisclosure from 'libs/useDisclosure'
import axios from 'libs/axios'
import {useAuth} from 'libs/auth'

function Transaction() {
  const {user} = useAuth()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [items, setItems] = React.useState([])
  const [cash, setCash] = React.useState(0)
  const totalPrice = items.reduce((acc, curr) => (acc += curr.totalPrice), 0)
  const cashback = cash > totalPrice ? cash - totalPrice : 0
  const {data: transactionData} = useSWR(
    `/store/${user.store.id}/transaction`,
    (url) => {
      return axios
        .get(url, {
          withCredentials: true
        })
        .then(({data}) => data)
    }
  )

  const handleAddItem = (newItem) => {
    const mergeObj = Object.assign({}, newItem, {
      quantity: 1,
      stock: newItem.stock - 1,
      totalPrice: newItem.price
    })
    setItems([...items, mergeObj])
  }

  const handleRemoveItem = (id) => {
    const filterItem = items.filter((item) => item.id !== id)
    setItems(filterItem)
  }

  const clearItems = () => {
    setItems([])
  }

  const increaseQuantity = (id) => {
    const newData = items.filter((item) => {
      if (item.id === id && item.stock) {
        item.stock--
        item.quantity++
        item.totalPrice = item.price * item.quantity
        return item
      }
      return item
    })
    setItems(newData)
  }

  const decreaseQuantity = (id) => {
    // eslint-disable-next-line
    const newData = items.filter((item) => {
      if (item.id === id && item.quantity > 1) {
        item.stock++
        item.quantity--
        item.totalPrice = item.price * item.quantity
        return item
      } else if (item.id !== id) {
        return item
      }
    })
    setItems(newData)
  }

  const processTransaction = async () => {
    await axios.post(
      `/store/${user.store.id}/transaction`,
      {
        items,
        cash,
        totalPrice,
        cashback,
        invoice: transactionData.data.invoice
      },
      {
        withCredentials: true
      }
    )
    mutate(`/store/${user.store.id}/transaction`)
    mutate(`/store/${user.store.id}/inventories`)
    setItems([])
    onOpen('success')
  }

  return (
    <Dashboard title="Transaksi">
      <AddItem
        idItems={items.map((item) => item.id)}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        idStore={user.store.id}
        isOpen={isOpen.state && isOpen.type === 'add'}
        onClose={onClose}
      />
      <SuccessModal
        isOpen={isOpen.state && isOpen.type === 'success'}
        onClose={onClose}
      />
      <ResetConfirmation
        isOpen={isOpen.state && isOpen.type === 'reset'}
        clearItems={clearItems}
        onClose={onClose}
      />
      <Stack spacing={6} shouldWrapChildren>
        <Data.Container>
          <Box>
            <Flex marginBottom="4" justifyContent="space-between">
              <Stack spacing={4} isInline shouldWrapChildren>
                <Item>
                  <ItemLabel>Tanggal</ItemLabel>
                  <ItemValue>{new Date().toLocaleDateString()}</ItemValue>
                </Item>
                <Item>
                  <ItemLabel>Invoice</ItemLabel>
                  <ItemValue>{transactionData?.data.invoice}</ItemValue>
                </Item>
              </Stack>
              <Data.Button
                onClick={onOpen.bind(null, 'add')}
                ariaLabel="add item"
                tooltipText="Add item"
                icon="add"
              />
            </Flex>
            <Data.ViewContainer>
              <Data.ViewGroup
                backgroundColor="blue.700"
                color="white"
                fontWeight="700"
              >
                <Data.LeftElement>#</Data.LeftElement>
                <Data.ViewContent>Nama</Data.ViewContent>
                <Data.ViewContent>Harga</Data.ViewContent>
                <Data.ViewContent>Stok</Data.ViewContent>
                <Data.ViewContent>Jumlah</Data.ViewContent>
                <Data.ViewContent>Total harga</Data.ViewContent>
              </Data.ViewGroup>
              {items.length ? (
                items.map((item, idx) => {
                  const backgroundColor = idx % 2 === 1 ? 'white' : 'gray.50'

                  return (
                    <PseudoBox
                      key={idx}
                      position="relative"
                      _hover={{
                        zIndex: '1',
                        boxShadow: '0 0px 4px rgba(0,0,0, 0.3)',
                        '.btnGroup': {
                          display: 'flex'
                        }
                      }}
                    >
                      <Data.ViewGroup backgroundColor={backgroundColor}>
                        <Data.LeftElement>{idx + 1}</Data.LeftElement>
                        <Data.ViewContent>{item.name}</Data.ViewContent>
                        <Data.ViewContent>{item.price}</Data.ViewContent>
                        <Data.ViewContent>{item.stock}</Data.ViewContent>
                        <Data.ViewContent>{item.quantity}</Data.ViewContent>
                        <Data.ViewContent>{item.totalPrice}</Data.ViewContent>
                      </Data.ViewGroup>
                      <PseudoBox
                        position="absolute"
                        right="0"
                        top="0"
                        className="btnGroup"
                        backgroundColor="green.300"
                        display="none"
                        _first={{
                          borderRight: '1px dashed'
                        }}
                      >
                        <IconButton
                          icon="add"
                          variantColor="white"
                          onClick={increaseQuantity.bind(null, item.id)}
                        />
                        <IconButton
                          icon="minus"
                          variantColor="white"
                          onClick={decreaseQuantity.bind(null, item.id)}
                        />
                      </PseudoBox>
                    </PseudoBox>
                  )
                })
              ) : (
                <Box padding="4" textAlign="center">
                  Tidak ada item
                </Box>
              )}
            </Data.ViewContainer>
          </Box>
        </Data.Container>
        <Box width="350px">
          <Data.Container>
            <Stack spacing={3} shouldWrapChildren>
              <Item>
                <ItemLabel>Total</ItemLabel>
                <ItemValue>{`Rp. ${totalPrice}`}</ItemValue>
              </Item>
              <Item>
                <ItemLabel>Bayar</ItemLabel>
                <NumberInput
                  value={cash}
                  onChange={(value) => setCash(value)}
                  isDisabled={!items.length}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Item>
              <Item>
                <ItemLabel>Kembali</ItemLabel>
                <ItemValue>{`Rp. ${cashback}`}</ItemValue>
              </Item>
              <Stack spacing="10px" isInline justifyContent="flex-end">
                <Button
                  variantColor="orange"
                  onClick={onOpen.bind(null, 'reset')}
                  isDisabled={!items.length}
                >
                  Batal
                </Button>
                <Button
                  isDisabled={!items.length || cash < totalPrice}
                  onClick={processTransaction}
                >
                  Proses
                </Button>
              </Stack>
            </Stack>
          </Data.Container>
        </Box>
      </Stack>
    </Dashboard>
  )
}

export default Transaction
