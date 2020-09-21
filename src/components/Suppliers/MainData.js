import React from 'react'
import useSWR from 'swr'
import {Box, Flex, Text, useToast} from '@chakra-ui/core'

import DeletePopup from './DeletePopup'
import EditForm from './EditForm'
import AddForm from './AddForm'
import Data from 'shared/Data'
import Pagination from 'shared/Pagination'
import Search from 'shared/Search'
import Checkbox from 'shared/Checkbox'
import Skeleton from 'shared/Skeleton'
import {useAuth} from 'libs/auth'
import useSearch from 'libs/useSearch'
import useSort from 'libs/useSort'
import useDisclosure from 'libs/useDisclosure'
import axios from 'libs/axios'

function MainData() {
  const {user} = useAuth()
  const [typedValue, searchValue, setSearchValue] = useSearch(500)
  const {sortBy, sortItemBy} = useSort()
  const toast = useToast()
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [selectedItem, setSelectedItem] = React.useState([])
  const [pageCount, setPageCount] = React.useState(1)
  const limit = 10
  const url = `/store/${user.store.id}/suppliers`
  const {data: suppliers, mutate} = useSWR(
    [url, pageCount, limit, sortBy.name, sortBy.order, searchValue],
    (url, page, limit, sort, order, q) => {
      const fullURL = `${url}?page=${page}&limit=${limit}&sort=${sort}&order=${order}&q=${q}`
      return axios
        .get(fullURL, {
          withCredentials: true
        })
        .then((res) => res.data)
    }
  )

  const handleSelectItem = (data, event) => {
    if (!suppliers?.data.length) {
      return false
    } else if (event.target.checked && data.length) {
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

  const handleDelete = async () => {
    const idSuppliers = selectedItem.map((s) => Number(s.id))
    await axios.post(
      `/store/${user.store.id}/suppliers/delete`,
      {
        data: idSuppliers
      },
      {
        withCredentials: true
      }
    )
    toast({
      title: `${idSuppliers.length} Item berhasil dihapus`,
      status: 'success',
      isClosable: true
    })
    setSelectedItem([])
    mutate()
  }

  const handleAddItem = async (formData) => {
    const {data} = await axios.post(
      `/store/${user.store.id}/suppliers`,
      formData,
      {
        withCredentials: true
      }
    )
    toast({
      title: 'Item berhasil ditambahkan',
      status: 'success',
      isClosable: true
    })
    const {insertId} = data.data
    const newData = Object.assign({id: insertId}, formData)
    mutate((cachedVal) => {
      return {
        data: [...cachedVal.data, newData],
        total: cachedVal.total + 1
      }
    })
  }

  const handleEditItem = async (formData) => {
    const {id, ...rest} = formData
    await axios.put(
      `/store/${user.store.id}/suppliers/${id}`,
      {
        data: rest
      },
      {
        withCredentials: true
      }
    )
    toast({
      title: 'Perubahan berhasil disimpan',
      status: 'success',
      isClosable: true
    })
    setSelectedItem([])
    mutate()
  }

  React.useEffect(() => {
    setPageCount(1)
  }, [searchValue, sortBy])

  React.useEffect(() => {
    setSelectedItem([])
  }, [pageCount])

  return (
    <>
      <AddForm
        isOpen={isOpen.state && isOpen.type === 'add'}
        onClose={onClose}
        handleAddItem={handleAddItem}
      />
      <EditForm
        item={selectedItem[0]}
        handleEditItem={handleEditItem}
        isOpen={isOpen.state && isOpen.type === 'edit'}
        onClose={onClose}
      />
      <DeletePopup
        isOpen={isOpen.state && isOpen.type === 'delete'}
        handleDelete={handleDelete}
        itemLength={selectedItem.length}
        onClose={onClose}
      />
      <Data.Container>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom="6"
        >
          <Search
            placeholder="Cari supplier ..."
            value={typedValue}
            onChange={handleSearch}
          />
          <Data.ActionWrapper>
            {selectedItem.length ? (
              <Text>{`${selectedItem.length} item dipilih`}</Text>
            ) : null}
            <Data.Button
              icon="add"
              tooltipText="Add item"
              ariaLabel="add data"
              onClick={onOpen.bind(null, 'add')}
            />
            <Data.Button
              icon="edit"
              tooltipText="Edit item"
              ariaLabel="edit data"
              onClick={onOpen.bind(null, 'edit')}
              isDisabled={selectedItem.length !== 1}
            />
            <Data.Button
              icon="delete"
              tooltipText="Delete items"
              ariaLabel="delete data"
              color="red.400"
              onClick={onOpen.bind(null, 'delete')}
              isDisabled={!selectedItem.length}
            />
          </Data.ActionWrapper>
        </Flex>
        <Data.ViewContainer>
          <Data.ViewGroup backgroundColor="blue.800">
            <Data.LeftElement>
              <Checkbox
                onChange={handleSelectItem.bind(null, suppliers?.data)}
                isChecked={
                  selectedItem.length &&
                  selectedItem.length === suppliers?.data.length
                }
              />
            </Data.LeftElement>
            <Data.ViewHead
              name="name"
              sortBy={sortBy}
              onClick={sortItemBy.bind(null, 'name')}
            >
              Nama
            </Data.ViewHead>
            <Data.ViewHead
              name="address"
              sortBy={sortBy}
              onClick={sortItemBy.bind(null, 'address')}
            >
              Alamat
            </Data.ViewHead>
            <Data.ViewHead
              name="phoneNumber"
              sortBy={sortBy}
              onClick={sortItemBy.bind(null, 'phoneNumber')}
            >
              Telepon
            </Data.ViewHead>
          </Data.ViewGroup>
          {!suppliers ? (
            <Skeleton count={3} height="30px" my="5px" />
          ) : suppliers.data.length ? (
            suppliers.data.map((d, i) => {
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
                  <Data.LeftElement>
                    <Checkbox
                      onChange={handleSelectItem.bind(null, d)}
                      isChecked={isChecked}
                    />
                  </Data.LeftElement>
                  <Data.ViewContent>{d.name}</Data.ViewContent>
                  <Data.ViewContent>{d.address}</Data.ViewContent>
                  <Data.ViewContent>{d.phoneNumber}</Data.ViewContent>
                </Data.ViewGroup>
              )
            })
          ) : (
            <Box textAlign="center" padding="6">
              Tidak ada data
            </Box>
          )}
        </Data.ViewContainer>
        {suppliers?.data.length ? (
          <Pagination
            totalData={suppliers?.total}
            pageCount={pageCount}
            limit={limit}
            currentDataLength={suppliers?.data?.length}
            onClickPreviousPage={() => setPageCount((state) => state - 1)}
            onClickNextPage={() => setPageCount((state) => state + 1)}
          />
        ) : null}
      </Data.Container>
    </>
  )
}

export default MainData
