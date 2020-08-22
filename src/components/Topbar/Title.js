import React from 'react'
import {Heading} from '@chakra-ui/core'

function Title({title}) {
	return (
		<Heading as="h2" color="gray.700" fontSize="1.7rem">
			{title}
		</Heading>
	)
}

export default Title
