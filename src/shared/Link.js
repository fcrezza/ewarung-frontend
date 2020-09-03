import React from 'react'
import {Link as ChakraLink} from '@chakra-ui/core'
import {Link as RouterLink} from 'react-router-dom'

function Link({to, children, isExternal, href}) {
	if (isExternal) {
		return (
			<ChakraLink fontWeight="bold" color="green.400" href={href} isExternal>
				{children}
			</ChakraLink>
		)
	}

	return (
		<ChakraLink fontWeight="bold" color="green.400" as={RouterLink} to={to}>
			{children}
		</ChakraLink>
	)
}

export default Link
