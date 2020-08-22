import React from 'react'
import {Button, Stack} from '@chakra-ui/core'
import {Link as RouterLink, useLocation} from 'react-router-dom'

function Link({children, to}) {
	const location = useLocation()
	const isActive = location.pathname === to

	return (
		<Button
			as={RouterLink}
			to={to}
			fontWeight="500"
			color={isActive ? 'white' : 'gray.600'}
			variantColor={isActive ? 'green' : 'gray'}
		>
			{children}
		</Button>
	)
}

function Container({children}) {
	return (
		<Stack spacing="3" marginBottom="6" shouldWrapChildren isInline>
			{children}
		</Stack>
	)
}

export {Link, Container}
