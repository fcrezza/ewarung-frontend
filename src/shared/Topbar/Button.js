import React from 'react'
import {Box, Text, Button as ChakraButton} from '@chakra-ui/core'

function Button({icon, children, ...props}) {
	return (
		<ChakraButton
			rounded="0"
			justifyContent="flex-start"
			backgroundColor="white"
			color="black"
			_hover={{
				backgroundColor: 'gray.100',
			}}
			_focus={{
				backgroundColor: 'gray.100',
			}}
			{...props}
		>
			<Box as={icon} marginRight=".8rem" />
			<Text>{children}</Text>
		</ChakraButton>
	)
}

export default Button
