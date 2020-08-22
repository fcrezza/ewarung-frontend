import React from 'react'
import {Box, Input, InputGroup, InputLeftElement} from '@chakra-ui/core'
import {RiSearchLine} from 'react-icons/ri'

function Search({type, value, onChange, placeholder}) {
	if (type === 2) {
		return <Input placeholder={placeholder} value={value} onChange={onChange} />
	}

	return (
		<InputGroup>
			<InputLeftElement children={<Box as={RiSearchLine} color="gray.400" />} />
			<Input
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				variant="filled"
			/>
		</InputGroup>
	)
}

export default Search
