import React from 'react'
import {Button as ChakraButton, Flex, Text, Box} from '@chakra-ui/core'

function Pagination(props) {
  const {
    pageCount,
    limit,
    currentDataLength,
    totalData,
    onClickPreviousPage,
    onClickNextPage
  } = props

  const firstIdx = pageCount * limit - limit + 1
  const lastIdx = pageCount * limit - limit + currentDataLength

  return (
    <Flex marginTop="6" alignItems="center">
      <Text marginLeft="auto" fontSize="sm" color="gray.600">
        {`Menampilkan ${firstIdx}-${lastIdx} dari ${totalData}`}
      </Text>
      <Box>
        <Button
          aria-label="previous data"
          onClick={onClickPreviousPage}
          isDisabled={firstIdx === 1}
        >
          ←
        </Button>
        <Button
          aria-label="next data"
          onClick={onClickNextPage}
          isDisabled={lastIdx === totalData}
        >
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
        marginX: '4'
      }}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}

export default Pagination
