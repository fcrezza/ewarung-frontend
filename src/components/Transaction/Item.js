import React from 'react'
import {Flex, Box} from '@chakra-ui/core'

export function Item({children}) {
  return <Flex alignItems="center">{children}</Flex>
}

export function ItemLabel({children}) {
  return (
    <Box width="70px" fontWeight="700">
      {children}
    </Box>
  )
}

export function ItemValue({children}) {
  return (
    <Box backgroundColor="gray.200" width="calc(100% - 70px)" padding="2">
      {children}
    </Box>
  )
}
