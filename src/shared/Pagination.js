import React from 'react'
import {Button as ChakraButton, Flex, Text, Box} from '@chakra-ui/core'

function Pagination(props) {
	const {firstIdx, lastIdx, onClickPreviousPage, onClickNextPage} = props

	return (
		<Flex marginTop="6" alignItems="center">
			<Text marginLeft="auto" fontSize="sm" color="gray.600">
				{/* need to set data length */}
				{`Menampilkan ${firstIdx}-${lastIdx} dari 4`}
			</Text>
			<Box>
				<Button
					aria-label="previous data"
					onClick={onClickPreviousPage}
					isDisabled={firstIdx === 1}
				>
					←
				</Button>
				{/* need to disable nextButton*/}
				<Button aria-label="next data" onClick={onClickNextPage}>
					→
				</Button>
			</Box>
		</Flex>
	)
}

function Button({children, onClick, ...props}) {
	return (
		<ChakraButton
			onClick={onClick}
			variant="outline"
			size="sm"
			fontSize="lg"
			lineHeight="32px"
			_first={{
				marginX: '4',
			}}
			{...props}
		>
			{children}
		</ChakraButton>
	)
}

export default Pagination
