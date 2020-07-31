import React from 'react'
import {Box, Heading, Text, Stack} from '@chakra-ui/core'

import {Input} from 'components/Input'
import Button from 'components/Button'
import Head from 'components/Head'

function resetPassword() {
	return (
		<>
			<Head title="Reset password" />
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
				<Heading color="green.400" mb="2" size="lg" textTransform="uppercase">
					reset password
				</Heading>
				<Text color="gray.600" mb="4">
					Masukan email akun anda, kami akan mengirim link konfirmasi untuk
					mereset password anda
				</Text>
				<Stack spacing="4">
					<Input type="email" name="email" placeholder="Email" autoFocus />
					<div>
						<Button>Kirim</Button>
					</div>
				</Stack>
			</Box>
		</>
	)
}

export default resetPassword
