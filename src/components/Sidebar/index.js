import React from 'react'
import {Flex, Box} from '@chakra-ui/core'

import Logo from '../Logo'
import {
	Overview,
	Transaction,
	Histories,
	Inventory,
	Suppliers,
	Setting,
} from './Link'

function Sidebar() {
	return (
		<Flex
			flexDirection="column"
			width="260px"
			position="fixed"
			backgroundColor="green.400"
			height="100%"
			zIndex={999}
		>
			<Box paddingTop="6" marginBottom="2" paddingX="6">
				<Logo />
			</Box>
			<Overview />
			<Transaction />
			<Histories />
			<Inventory />
			<Suppliers />
			<Setting />
		</Flex>
	)
}

export default Sidebar
