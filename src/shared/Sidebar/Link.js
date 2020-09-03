import React from 'react'
import {Link as RouterLink, useLocation} from 'react-router-dom'
import {Box, Text, Flex} from '@chakra-ui/core'
import {
	RiShoppingBag3Line,
	RiUser5Line,
	RiStickyNoteLine,
	RiArchiveDrawerLine,
	RiSettings4Line,
} from 'react-icons/ri'
import {IoMdStats} from 'react-icons/io'

function Link({to, icon, children}) {
	const location = useLocation()
	const isActive = location.pathname === to

	return (
		<Flex as={RouterLink} paddingX="6" paddingY="1" to={to}>
			<Flex
				padding="2"
				rounded="lg"
				width="100%"
				alignItems="center"
				backgroundColor={isActive ? 'green.500' : null}
			>
				<Box as={icon} color={isActive ? 'white' : 'gray.100'} size="32px" />
				<Text
					color={isActive ? 'white' : 'gray.100'}
					marginLeft="3"
					fontWeight="500"
				>
					{children}
				</Text>
			</Flex>
		</Flex>
	)
}

function Overview() {
	return (
		<Link to="/dashboard/overview" icon={IoMdStats}>
			Ikhtisar
		</Link>
	)
}

function Transaction() {
	return (
		<Link to="/dashboard/transaction" icon={RiShoppingBag3Line}>
			Transaksi
		</Link>
	)
}

function Histories() {
	return (
		<Link to="/dashboard/transaction-histories" icon={RiStickyNoteLine}>
			Riwayat Transaksi
		</Link>
	)
}

function Inventory() {
	return (
		<Link to="/dashboard/inventory" icon={RiArchiveDrawerLine}>
			Barang
		</Link>
	)
}

function Suppliers() {
	return (
		<Link to="/dashboard/suppliers" icon={RiUser5Line}>
			Supplier
		</Link>
	)
}

function Setting() {
	return (
		<Box marginTop="auto">
			<Link to="/dashboard/profile" icon={RiSettings4Line}>
				Pengaturan
			</Link>
		</Box>
	)
}

export {Overview, Transaction, Histories, Inventory, Suppliers, Setting}
