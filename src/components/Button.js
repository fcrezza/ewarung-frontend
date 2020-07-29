import React from 'react'
import {Button as ChakraButton} from '@chakra-ui/core'

function Button({children, block}) {
	return (
		<ChakraButton variantColor="green" w={block ? '100%' : null}>
			{children}
		</ChakraButton>
	)
}

export default Button
