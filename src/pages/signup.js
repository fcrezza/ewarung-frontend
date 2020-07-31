import React from 'react'
import {Box, Heading, Stack} from '@chakra-ui/core'

import {Input, PasswordInput} from 'components/Input'
import Button from 'components/Button'
import Head from 'components/Head'

function signup() {
	return (
		<>
			<Head title="Daftar" />
			<Box
				w="100%"
				maxWidth="450px"
				border="1px"
				borderColor="gray.300"
				rounded="lg"
				pos="absolute"
				p="8"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
			>
				<Heading color="green.400" size="lg" mb="6" textTransform="uppercase">
					Daftar
				</Heading>
				<Stack as="form" spacing="5" shouldWrapChildren>
					<Input name="username" placeholder="Username" autoFocus />
					<Input name="email" placeholder="Email" type="email" />
					<PasswordInput />
					<Button block>Daftar</Button>
				</Stack>
			</Box>
		</>
	)
}

export default signup
