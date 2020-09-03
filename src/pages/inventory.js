import React from 'react'
import {Flex, Box, Skeleton, Text, Stack} from '@chakra-ui/core'
import useSWR from 'swr'

import AddForm from 'components/Inventory/AddForm'
import EditForm from 'components/Inventory/EditForm'
import DeletePopup from 'components/Inventory/DeletePopup'
import Head from 'shared/Head'
import Data from 'shared/Data'
import Dashboard from 'shared/Dashboard'
import Button from 'shared/Button'
import Pagination from 'shared/Pagination'
import Search from 'shared/Search'
import {useAuth} from 'libs/auth'
import useSearch from 'libs/useSearch'
import axios from 'libs/axios'

function Inventory() {
  const [typedValue, searchValue, setSearchValue] = useSearch(500)
  const [modal, setModalVisibility] = React.useState({
    isOpen: false,
    type: ''
  })
  const [selectedItem, setSelectedItem] = React.useState([])
  const [sort, sortItemBy] = React.useState(null)
  const limit = 10 // need to change page limit
  const [pageCount, setPageCount] = React.useState(1)
  const {user} = useAuth()
  const {
    data
  } = useSWR(
    `http://localhost:5000/inventories?idStore=${user.store.id}&_page=${pageCount}&_limit=${limit}&_sort=${sort?.name}&_order=${sort?.order}&q=${searchValue}`,
    (key) => axios.get(key).then((res) => res.data)
  )
  const {
    data: mostStock
  } = useSWR(
    `http://localhost:5000/inventories?idStore=${user.store.id}&_limit=5&_sort=stock&_order=desc`,
    (key) => axios.get(key).then((res) => res.data)
  )
  const {
    data: lessStock
  } = useSWR(
    `http://localhost:5000/inventories?idStore=${user.store.id}&_limit=5&_sort=stock&_order=asc`,
    (key) => axios.get(key).then((res) => res.data)
  )

  const handleSelectItem = (data, event) => {
    if (event.target.checked && data.length) {
      setSelectedItem(data)
    } else if (event.target.checked) {
      setSelectedItem([...selectedItem, data])
    } else if (!event.target.checked && data.length) {
      setSelectedItem([])
    } else {
      setSelectedItem((state) => state.filter((i) => i.id !== data.id))
    }
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const onClose = () => {
    setModalVisibility((state) => ({
      ...state,
      isOpen: false
    }))
  }

  const onOpen = (type) => {
    setModalVisibility((state) => ({
      type,
      isOpen: true
    }))
  }

  const sortItem = (name) => {
    if (sort?.name === name && sort?.order === 'asc') {
      sortItemBy((state) => ({
        ...state,
        order: 'desc'
      }))
      return
    }

    sortItemBy({
      name: name,
      order: 'asc'
    })
  }

  React.useEffect(() => {
    setPageCount(1)
  }, [searchValue, sort])

  React.useEffect(() => {
    setSelectedItem([])
  }, [pageCount])

  return (
    <Dashboard title="Data Barang">
      <Head title="Data Barang" />
      <AddForm
        isOpen={modal.isOpen && modal.type === 'add'}
        onClose={onClose}
      />
      <EditForm
        item={selectedItem[0]}
        isOpen={modal.isOpen && modal.type === 'edit'}
        onClose={onClose}
      />
      <DeletePopup
        isOpen={modal.isOpen && modal.type === 'delete'}
        items={selectedItem}
        onClose={onClose}
      />
      <Box marginBottom="6">
        <Button onClick={onOpen.bind(null, 'add')}>Tambah barang</Button>
      </Box>
      <Flex alignContent="flex-start">
        <Data.Container>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom="6"
          >
            <Search
              placeholder="Cari barang ..."
              value={typedValue}
              onChange={handleSearch}
            />
            {selectedItem.length ? (
              <Data.ButtonGroup>
                <Text>{`${selectedItem.length} item dipilih`}</Text>
                {selectedItem.length === 1 ? (
                  <Data.Button
                    color="green.400"
                    onClick={onOpen.bind(null, 'edit')}
                  >
                    Edit
                  </Data.Button>
                ) : null}
                <Data.Button
                  color="red.400"
                  onClick={onOpen.bind(null, 'delete')}
                >
                  Hapus
                </Data.Button>
              </Data.ButtonGroup>
            ) : null}
          </Flex>
          <Data.ViewContainer>
            <Data.ViewGroup backgroundColor="blue.800">
              <Data.CheckOption
                onChange={handleSelectItem.bind(null, data)}
                isChecked={
                  selectedItem.length === data?.length && Boolean(data?.length)
                }
              />
              <Data.ViewHead
                name="name"
                sort={sort}
                onClick={sortItem.bind(null, 'name')}
              >
                Nama
              </Data.ViewHead>
              <Data.ViewHead
                name="price"
                sort={sort}
                onClick={sortItem.bind(null, 'price')}
              >
                Harga
              </Data.ViewHead>
              <Data.ViewHead
                name="stock"
                sort={sort}
                onClick={sortItem.bind(null, 'stock')}
              >
                Stok
              </Data.ViewHead>
              <Data.ViewHead
                name="idSupplier"
                sort={sort}
                onClick={sortItem.bind(null, 'idSupplier')}
              >
                Supplier
              </Data.ViewHead>
            </Data.ViewGroup>
            {!data ? (
              <>
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
              </>
            ) : (
              data.map((d, i) => {
                const isChecked = !!selectedItem.find((i) => i.id === d.id)
                const backgroundColor = isChecked
                  ? 'green.100'
                  : i % 2 === 1
                  ? 'gray.200'
                  : 'gray.50'

                return (
                  <Data.ViewGroup
                    key={`${d.name}-${d.id}`}
                    backgroundColor={backgroundColor}
                  >
                    <Data.CheckOption
                      onChange={handleSelectItem.bind(null, d)}
                      isChecked={isChecked}
                    />
                    <Data.ViewContent>{d.name}</Data.ViewContent>
                    <Data.ViewContent>{d.price}</Data.ViewContent>
                    <Data.ViewContent>{d.stock}</Data.ViewContent>
                    <Data.ViewContent>{d.idSupplier}</Data.ViewContent>
                  </Data.ViewGroup>
                )
              })
            )}
          </Data.ViewContainer>
          <Pagination
            firstIdx={pageCount * limit - limit + 1}
            lastIdx={pageCount * limit}
            onClickPreviousPage={() => setPageCount((state) => state - 1)}
            onClickNextPage={() => setPageCount((state) => state + 1)}
          />
        </Data.Container>
        <Stack maxWidth="350px" spacing="4" marginLeft="6" flex="1">
          <Box backgroundColor="white" padding="4" rounded="md" boxShadow="md">
            <Box marginBottom="4">
              <Text as="h2" fontWeight="bold">
                Stok paling banyak
              </Text>
            </Box>
            <Data.ViewGroup
              backgroundColor="blue.800"
              fontWeight="bold"
              color="white"
            >
              <Data.LeftElement>No.</Data.LeftElement>
              <Data.ViewContent>Nama</Data.ViewContent>
              <Data.ViewContent>Stock</Data.ViewContent>
            </Data.ViewGroup>
            {!mostStock ? (
              <>
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
              </>
            ) : (
              mostStock.map((d, i) => {
                const backgroundColor = i % 2 === 1 ? 'gray.200' : 'gray.50'

                return (
                  <Data.ViewGroup
                    key={`${d.name}-${d.id}`}
                    backgroundColor={backgroundColor}
                  >
                    <Data.LeftElement>{i + 1}</Data.LeftElement>
                    <Data.ViewContent>{d.name}</Data.ViewContent>
                    <Data.ViewContent>{d.stock}</Data.ViewContent>
                  </Data.ViewGroup>
                )
              })
            )}
          </Box>
          <Box backgroundColor="white" padding="4" rounded="md" boxShadow="md">
            <Box marginBottom="4">
              <Text as="h2" fontWeight="bold">
                Stok paling Sedikit
              </Text>
            </Box>
            <Data.ViewGroup
              fontWeight="bold"
              backgroundColor="blue.800"
              color="white"
            >
              <Data.LeftElement>No.</Data.LeftElement>
              <Data.ViewContent>Nama</Data.ViewContent>
              <Data.ViewContent>Stock</Data.ViewContent>
            </Data.ViewGroup>
            {!lessStock ? (
              <>
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
                <Skeleton height="30px" my="5px" />
              </>
            ) : (
              lessStock.map((d, i) => {
                const backgroundColor = i % 2 === 1 ? 'gray.200' : 'gray.50'

                return (
                  <Data.ViewGroup
                    key={`${d.name}-${d.id}`}
                    backgroundColor={backgroundColor}
                  >
                    <Data.LeftElement>{i + 1}</Data.LeftElement>
                    <Data.ViewContent>{d.name}</Data.ViewContent>
                    <Data.ViewContent>{d.stock}</Data.ViewContent>
                  </Data.ViewGroup>
                )
              })
            )}
          </Box>
        </Stack>
      </Flex>
    </Dashboard>
  )
}

export default Inventory
