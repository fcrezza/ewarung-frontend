import React from 'react'
import {Flex} from '@chakra-ui/core'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Dashboard({children, title}) {
	return (
		<Flex backgroundColor="gray.50" position="relative" minHeight="100vh">
			<Sidebar />
			<Flex
				flex="1"
				flexDirection="column"
				marginLeft="270px"
				paddingTop="6"
				paddingBottom="8"
				paddingX="8"
			>
				<Topbar title={title} />
				{children}
			</Flex>
		</Flex>
	)
}

export default Dashboard
