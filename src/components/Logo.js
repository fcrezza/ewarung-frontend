import React from 'react'
import {PseudoBox} from '@chakra-ui/core'
import {Link} from 'react-router-dom'
import {RiStore3Line} from 'react-icons/ri'

function Logo() {
	return (
		<PseudoBox
			as={Link}
			to="/dashboard/overview"
			display="inline-block"
			padding="2"
			border="2px solid"
			borderColor="#f9ff21"
			borderRadius="50%"
			_hover={{
				backgroundColor: 'green.500',
			}}
			_focus={{
				backgroundColor: 'green.500',
			}}
		>
			<RiStore3Line color="#f9ff21" size="36px" />
		</PseudoBox>
	)
}

export default Logo
