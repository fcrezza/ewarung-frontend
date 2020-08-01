import React from 'react'
import {Box, Heading, Text, Stack} from '@chakra-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import {object, string} from 'yup'

import {Input} from 'components/Input'
import Button from 'components/Button'
import Head from 'components/Head'

const validationSchema = object().shape({
	email: string()
		.email('Masukan email yang valid')
		.required('Email tidak boleh kosong'),
})

function ResetPassword() {
	const {register, handleSubmit, errors} = useForm({
		resolver: yupResolver(validationSchema),
	})

	const onSubmit = (email) => {
		console.log({email})
	}

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
				<Stack
					as="form"
					onSubmit={handleSubmit(onSubmit)}
					spacing="4"
					shouldWrapChildren
				>
					<Input
						register={register}
						error={errors?.email}
						type="email"
						name="email"
						placeholder="Email"
						autoFocus
					/>
					<Button type="submit">Kirim</Button>
				</Stack>
			</Box>
		</>
	)
}

export default ResetPassword
