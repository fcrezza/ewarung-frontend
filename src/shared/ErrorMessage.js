import React from 'react'
import {FormErrorMessage} from '@chakra-ui/core'

function ErrorMessage({isInvalid, children}) {
	return <FormErrorMessage isInvalid={isInvalid}>{children}</FormErrorMessage>
}

export default ErrorMessage
