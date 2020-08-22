import React from 'react'
import {Button as ChakraButton, Flex, Text as ChakraText} from '@chakra-ui/core'

function Container({children}) {
	return (
		<Flex marginTop="6" alignItems="center">
			{children}
		</Flex>
	)
}

function Text({children}) {
	return (
		<ChakraText marginLeft="auto" fontSize="sm" color="gray.600">
			{children}
		</ChakraText>
	)
}

function Button({children}) {
	return (
		<ChakraButton
			variant="outline"
			size="sm"
			fontSize="lg"
			lineHeight="32px"
			_first={{
				marginX: '4',
			}}
		>
			{children}
		</ChakraButton>
	)
}

export {Container, Text, Button}
