import React from 'react'
import {Box, Flex, Heading, Stack, Text} from '@chakra-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import {object, string} from 'yup'

import {Input, PasswordInput} from 'components/Input'
import Button from 'components/Button'
import Link from 'components/Link'
import Head from 'components/Head'

const validationSchema = object().shape({
	username: string().required('Username tidak boleh kosong'),
	email: string()
		.email('Masukan email yang valid')
		.required('Email tidak boleh kosong'),
	password: string()
		.min(8, (num) => `Password minimal mengandung ${8} karakter`)
		.required('Password tidak boleh kosong'),
})

function Signup() {
	const {register, handleSubmit, errors} = useForm({
		resolver: yupResolver(validationSchema),
	})

	const onSubmit = (formData) => {
		console.log('formData: ', formData)
	}

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
				<Stack
					as="form"
					onSubmit={handleSubmit(onSubmit)}
					spacing="5"
					shouldWrapChildren
				>
					<Input
						ref={register}
						error={errors?.username}
						name="username"
						placeholder="Username"
						autoFocus
					/>
					<Input
						ref={register}
						error={errors?.email}
						name="email"
						placeholder="Email"
						type="email"
					/>
					<PasswordInput ref={register} error={errors?.password} />
					<Button type="submit" block>
						Daftar
					</Button>
				</Stack>
				<Flex mt="8">
					<Text color="gray.600">
						Sudah punya akun ? <Link to="/">Masuk</Link>
					</Text>
				</Flex>
			</Box>
		</>
	)
}

export default Signup
