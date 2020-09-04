import React from 'react'
import useSWR from 'swr'
import {Box, Flex, Text} from '@chakra-ui/core'

import {AddForm, EditForm, DeletePopup} from 'components/Suppliers'
import Dashboard from 'shared/Dashboard'
import Head from 'shared/Head'
import Data from 'shared/Data'
import Button from 'shared/Button'
import Pagination from 'shared/Pagination'
import Search from 'shared/Search'
import Checkbox from 'shared/Checkbox'
import Skeleton from 'shared/Skeleton'
import {useAuth} from 'libs/auth'
import useSearch from 'libs/useSearch'
import useSort from 'libs/useSort'
import useDisclosure from 'libs/useDisclosure'
import axios from 'libs/axios'

function Suppliers() {
  const [typedValue, searchValue, setSearchValue] = useSearch(500)
  const {sortBy, sortItemBy} = useSort()
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [selectedItem, setSelectedItem] = React.useState([])
  const limit = 10 // need to change page limit
  const [pageCount, setPageCount] = React.useState(1)
  const {user} = useAuth()
  const {data: suppliers} = useSWR(
    [
      'http://localhost:5000/suppliers',
      user.store.id,
      sortBy.name,
      sortBy.order,
      searchValue
    ],
    (url, idStore, sort, order, q) => {
      const fullURL = `${url}?idStore=${idStore}&_page=${pageCount}&_limit=${limit}&_sort=${sort}&_order=${order}&q=${q}`
      return axios.get(fullURL).then((res) => res.data)
    }
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

  React.useEffect(() => {
    setPageCount(1)
  }, [searchValue, sortBy])

  return (
    <Dashboard title="Data suppliers">
      <Head title="Data suppliers" />
      <AddForm
        isOpen={isOpen.state && isOpen.type === 'add'}
        onClose={onClose}
      />
      <EditForm
        item={selectedItem[0]}
        isOpen={isOpen.state && isOpen.type === 'edit'}
        onClose={onClose}
      />
      <DeletePopup
        isOpen={isOpen.state && isOpen.type === 'delete'}
        items={selectedItem}
        onClose={onClose}
      />
      <Box marginBottom="6">
        <Button onClick={onOpen.bind(null, 'add')}>Tambah supplier</Button>
      </Box>
      <Flex>
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
              <Data.LeftElement>
                <Checkbox
                  onChange={handleSelectItem.bind(null, suppliers)}
                  isChecked={
                    selectedItem.length === suppliers?.length &&
                    Boolean(suppliers?.length)
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
            ) : (
              suppliers.map((d, i) => {
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
            )}
          </Data.ViewContainer>
          <Pagination
            firstIdx={pageCount * limit - limit + 1}
            lastIdx={pageCount * limit}
            onClickPreviousPage={() => setPageCount((state) => state - 1)}
            onClickNextPage={() => setPageCount((state) => state + 1)}
          />
        </Data.Container>
      </Flex>
    </Dashboard>
  )
}

export default Suppliers
