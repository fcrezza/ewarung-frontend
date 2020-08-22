import React from 'react'
import {Box, Heading, Text} from '@chakra-ui/core'
import {useLocation, Redirect, Link as RouterLink} from 'react-router-dom'

import Button from 'components/Button'
import Head from 'components/Head'

function SuccessChange() {
	const location = useLocation()

	if (!location.state?.success) {
		return <Redirect to="/resetPassword" />
	}

	return (
		<Box
			w="100%"
			maxWidth="450px"
			pos="absolute"
			p="8"
			border="1px"
			borderColor="gray.300"
			rounded="lg"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
		>
			<Head title="Email berhasil dikirim" />
			<Heading color="green.400" mb="2" size="lg" textTransform="uppercase">
				Password berhasil direset
			</Heading>
			<Text color="gray.600" mb="3">
				Login untuk masuk ke dashboard akun anda
			</Text>
			<Button as={RouterLink} to="/login">
				Login
			</Button>
		</Box>
	)
}

export default SuccessChange
