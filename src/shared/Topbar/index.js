import React from 'react'
import {Flex} from '@chakra-ui/core'

import Title from './Title'
import Profile from './Profile'

function Topbar({title}) {
	return (
		<Flex alignItems="center" justifyContent="space-between" marginBottom="6">
			<Title title={title} />
			<Profile />
		</Flex>
	)
}
export default Topbar
