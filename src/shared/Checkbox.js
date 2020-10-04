import React from 'react'
import {Checkbox as ChakraCheckbox} from '@chakra-ui/core'

function Checkbox({onChange, isChecked, ...props}) {
  return (
    <ChakraCheckbox
      onChange={onChange}
      size="lg"
      variantColor="green"
      borderColor="gray.400"
      isChecked={isChecked}
      {...props}
    />
  )
}

export default Checkbox
