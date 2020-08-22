import React from 'react'
import {Flex} from '@chakra-ui/core'

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
			width="250px"
			position="fixed"
			backgroundColor="green.400"
			height="100%"
			zIndex={999}
		>
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
