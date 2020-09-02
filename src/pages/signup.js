import React from 'react'
import {Box, Flex, Heading, Stack, Text} from '@chakra-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import {object, string} from 'yup'
import {useHistory} from 'react-router-dom'

import {Input, PasswordInput} from 'components/Input'
import Button from 'components/Button'
import Link from 'components/Link'
import Head from 'components/Head'
import {useAuth} from 'libs/auth'

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
	const {signup} = useAuth()
	const history = useHistory()
	const {register, handleSubmit, formState, errors, setError} = useForm({
		resolver: yupResolver(validationSchema),
	})

	const onSubmit = async (formData) => {
		try {
			await signup(formData)
			history.push('/accountVerification', {
				user: formData,
			})
		} catch (err) {
			if (err.response) {
				const {message} = err.response.data
				setError(message.name, {message: message.message})
			}
		}
	}

	return (
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
			<Head title="Daftar" />
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
				<PasswordInput
					ref={register}
					name="password"
					placeholder="Masukan password kamu"
					error={errors?.password}
				/>
				<Button type="submit" block isDisabled={formState.isSubmitting}>
					{formState.isSubmitting ? 'Mendaftar ...' : 'Daftar'}
				</Button>
			</Stack>
			<Flex mt="8">
				<Text color="gray.600">
					Sudah punya akun ? <Link to="/">Masuk</Link>
				</Text>
			</Flex>
		</Box>
	)
}

export default Signup
