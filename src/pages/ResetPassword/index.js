import React from 'react'
import {Box, Heading, Text, Stack} from '@chakra-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import {object, string} from 'yup'
import {useHistory, useRouteMatch} from 'react-router-dom'

import {Input} from 'components/Input'
import Button from 'components/Button'
import Head from 'components/Head'
import axios from 'libs/axios'

const validationSchema = object().shape({
	email: string()
		.email('Masukan email yang valid')
		.required('Email tidak boleh kosong'),
})

function ResetPassword() {
	const history = useHistory()
	const match = useRouteMatch()
	const {register, handleSubmit, errors, setError, formState} = useForm({
		resolver: yupResolver(validationSchema),
	})

	const onSubmit = async (formData) => {
		try {
			await axios.post('/user/resetPassword/request', formData)
			history.push(`${match.url}/sendEmail`, {
				email: formData.email,
			})
		} catch (err) {
			if (err.response) {
				setError('email', {
					type: 'manual',
					message: err.response.data.message,
				})
			}
		}
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
			<Head title="Reset password" />
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
					ref={register}
					error={errors?.email}
					type="email"
					name="email"
					placeholder="Email"
					autoFocus
				/>
				<Button type="submit" isDisabled={formState.isSubmitting}>
					{formState.isSubmitting ? 'Kirim ...' : 'Kirim'}
				</Button>
			</Stack>
		</Box>
	)
}

export default ResetPassword
