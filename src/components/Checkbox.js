import React from 'react'
import {Flex, Checkbox as ChakraCheckbox} from '@chakra-ui/core'

function Checkbox() {
	return (
		<Flex alignItems="center" padding="2">
			<ChakraCheckbox size="lg" variantColor="green" borderColor="gray.400" />
		</Flex>
	)
}

export default Checkbox
