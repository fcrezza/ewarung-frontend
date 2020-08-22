import React from 'react'
import {Box, Link, Stack} from '@chakra-ui/core'

function Container({children}) {
	return (
		<Box backgroundColor="white" padding="6" rounded="md" boxShadow="md">
			{children}
		</Box>
	)
}

function ButtonGroup({children}) {
	return (
		<Stack spacing="4" shouldWrapChildren isInline>
			{children}
		</Stack>
	)
}

function Button({color, children}) {
	return (
		<Link as="button" color={color} fontWeight="500">
			{children}
		</Link>
	)
}

export {Button, ButtonGroup, Container}
