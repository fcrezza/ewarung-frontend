import React from 'react'
import {Button as ChakraButton} from '@chakra-ui/core'

function Button({children, block, ...props}) {
	return (
		<ChakraButton variantColor="green" w={block ? '100%' : null} {...props}>
			{children}
		</ChakraButton>
	)
}

export default Button
