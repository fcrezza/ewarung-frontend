import React from 'react'
import {Flex, Checkbox as ChakraCheckbox} from '@chakra-ui/core'

function Checkbox({onChange, isChecked, ...props}) {
  return (
    <Flex alignItems="center" padding="2">
      <ChakraCheckbox
        onChange={onChange}
        size="lg"
        variantColor="green"
        borderColor="gray.400"
        isChecked={isChecked}
        {...props}
      />
    </Flex>
  )
}

export default Checkbox
