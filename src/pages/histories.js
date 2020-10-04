import React from 'react'
import useSWR from 'swr'
import {PseudoBox, Box, Stack, Flex, Text, useToast} from '@chakra-ui/core'
import {useHistory} from 'react-router-dom'

import DatePicker from 'components/Histories/DatePicker'
import DeletePopup from 'components/Histories/DeletePopup'
import Head from 'shared/Head'
import Pagination from 'shared/Pagination'
import Dashboard from 'shared/Dashboard'
import Data from 'shared/Data'
import Checkbox from 'shared/Checkbox'
import useSort from 'libs/useSort'
import useDisclosure from 'libs/useDisclosure'
import Skeleton from 'shared/Skeleton'
import axios from 'libs/axios'
import formatDate from 'libs/formatDate'
import {useAuth} from 'libs/auth'

function Histories() {
	const {user} = useAuth()
	const {sortBy, sortItemBy} = useSort()
	const toast = useToast()
	const history = useHistory()
	const {isOpen, onClose, onOpen} = useDisclosure()
	const [date, setDate] = React.useState({
		start: new Date(user.user.createdAt),
		end: new Date()
	})
	const [selectedItem, setSelectedItem] = React.useState([])
	const [pageCount, setPageCount] = React.useState(1)
	const limit = 10
	const url = `/store/${user.store.id}/transactions`
	const {data: transactions, mutate} = useSWR(
		[url, pageCount, sortBy.name, sortBy.order, date.start, date.end],
		(url, page, sort, order, startDate, endDate) => {
			startDate = formatDate(startDate)
			endDate = formatDate(endDate)
			const fullURL = `${url}?page=${page}&limit=${limit}&sort=${sort}&order=${order}&startDate=${startDate}&endDate=${endDate}`
			return axios.get(fullURL).then((res) => res.data)
		}
	)

	const onSelectItem = (data, event) => {
		if (!transactions?.data.length) {
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

	const onSetDate = (type) => {
		return (value) => {
			setDate((prevState) => ({
				...prevState,
				[type]: value
			}))
		}
	}

	const onDelete = async () => {
		const invoices = selectedItem.map((s) => s.id)
		await axios.post(`/store/${user.store.id}/transactions/delete`, {
			invoices
		})
		toast({
			title: `${invoices.length} Item berhasil dihapus`,
			status: 'success',
			isClosable: true
		})
		setSelectedItem([])
		mutate()
	}

	const onClickItem = () => {
		history.push('/')
	}

	return (
		<Dashboard title="Riwayat Transaksi">
			<Head title="Riwayat Transaksi" />
			<DeletePopup
				isOpen={isOpen.state && isOpen.type === 'delete'}
				onDelete={onDelete}
				itemLength={selectedItem.length}
				onClose={onClose}
			/>
			<Data.Container>
				<Flex justifyContent="space-between">
					<Stack spacing="26px" isInline shouldWrapChildren marginBottom="28px">
						<DatePickerInput
							id="date-start"
							labelText="Dari:"
							date={date.start}
							onSetDate={onSetDate('start')}
						/>
						<DatePickerInput
							id="date-end"
							labelText="Sampai:"
							date={date.end}
							onSetDate={onSetDate('end')}
						/>
					</Stack>
					<Data.Button
						icon="delete"
						tooltipText="Delete items"
						ariaLabel="delete data"
						color="red.400"
						onClick={() => onOpen('delete')}
						isDisabled={!selectedItem.length}
					/>
				</Flex>
				<Data.ViewContainer>
					<Data.ViewGroup backgroundColor="blue.700">
						<Data.LeftElement>
							<Checkbox
								onChange={(event) => {
									const allCurrentItem = transactions?.data.slice(
										(pageCount - 1) * limit,
										pageCount * limit
									)
									onSelectItem(allCurrentItem, event)
								}}
								isChecked={
									selectedItem.length &&
									selectedItem.length ===
										transactions?.data.slice(
											(pageCount - 1) * limit,
											pageCount * limit
										).length
								}
							/>
						</Data.LeftElement>
						<Data.ViewHead
							name="invoice"
							sortBy={sortBy}
							onClick={() => sortItemBy('invoice')}
						>
							Invoice
						</Data.ViewHead>
						<Data.ViewHead
							name="totalItem"
							sortBy={sortBy}
							onClick={() => sortItemBy('totalItem')}
						>
							Total barang
						</Data.ViewHead>
						<Data.ViewHead
							name="totalPrice"
							sortBy={sortBy}
							onClick={() => sortItemBy('totalPrice')}
						>
							Total harga
						</Data.ViewHead>
						<Data.ViewHead
							name="cash"
							sortBy={sortBy}
							onClick={() => sortItemBy('cash')}
						>
							Bayar
						</Data.ViewHead>
						<Data.ViewHead
							name="cashback"
							sortBy={sortBy}
							onClick={() => sortItemBy('cashback')}
						>
							Kembali
						</Data.ViewHead>
						<Data.ViewHead
							name="timestamp"
							sortBy={sortBy}
							onClick={() => sortItemBy('timestamp')}
						>
							Tanggal
						</Data.ViewHead>
					</Data.ViewGroup>
					{!transactions ? (
						<Skeleton count={3} height="30px" my="5px" />
					) : transactions.data.length ? (
						transactions.data.map((transaction, idx) => {
							const isChecked = Boolean(
								selectedItem.find((item) => item.id === transaction.id)
							)
							const backgroundColor = isChecked
								? 'green.100'
								: idx % 2 === 1
								? 'gray.200'
								: 'gray.50'

							return (
								<TransactionItem
									transaction={transaction}
									isChecked={isChecked}
									backgroundColor={backgroundColor}
									onSelectItem={onSelectItem}
								/>
							)
						})
					) : (
						<Box textAlign="center" padding="6">
							Tidak ada data
						</Box>
					)}
				</Data.ViewContainer>
				<Pagination
					totalData={transactions?.total}
					pageCount={pageCount}
					limit={limit}
					currentDataLength={transactions?.data?.length}
					onClickPreviousPage={() => setPageCount((state) => state - 1)}
					onClickNextPage={() => setPageCount((state) => state + 1)}
				/>
			</Data.Container>
		</Dashboard>
	)
}

function DatePickerInput({labelText, id, date, onSetDate}) {
	return (
		<Flex alignItems="center">
			<Text as="label" htmlFor={id} marginRight="14px">
				{labelText}
			</Text>
			<DatePicker id={id} date={date} onSetDate={onSetDate} />
		</Flex>
	)
}

function TransactionItem({
	backgroundColor,
	transaction,
	isChecked,
	onSelectItem
}) {
	return (
		<PseudoBox
			_hover={{
				boxShadow: '0 0px 4px rgba(0,0,0, 0.3)',
				zIndex: 1
			}}
			position="relative"
			cursor="pointer"
			onClick={onSelectItem}
		>
			<Data.ViewGroup backgroundColor={backgroundColor}>
				<Data.LeftElement>
					<Checkbox
						onChange={(event) => onSelectItem(transaction, event)}
						isChecked={isChecked}
					/>
				</Data.LeftElement>
				<Data.ViewContent>{transaction.invoice}</Data.ViewContent>
				<Data.ViewContent>{transaction.totalItem}</Data.ViewContent>
				<Data.ViewContent>{transaction.totalPrice}</Data.ViewContent>
				<Data.ViewContent>{transaction.cash}</Data.ViewContent>
				<Data.ViewContent>{transaction.cashback}</Data.ViewContent>
				<Data.ViewContent>{formatDate(transaction.timestamp)}</Data.ViewContent>
			</Data.ViewGroup>
		</PseudoBox>
	)
}

export default Histories
