import React from 'react'
import {FormLabel} from '@chakra-ui/core'

function Label({name, children, ...props}) {
	return (
		<FormLabel color="gray.700" htmlFor={name} {...props}>
			{children}
		</FormLabel>
	)
}

export default Label
