import React from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Box, Heading, Stack} from '@chakra-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import {object, string} from 'yup'

import {PasswordInput} from 'components/Input'
import Button from 'components/Button'
import Spinner from 'components/Spinner'
import Head from 'components/Head'
import axios from 'libs/axios'

const validationSchema = object().shape({
	newPassword: string()
		.min(8, (num) => `Password minimal mengandung ${8} karakter`)
		.required('Password tidak boleh kosong'),
	passwordConfirmation: string()
		.min(8, (num) => `Password minimal mengandung ${8} karakter`)
		.required('Password tidak boleh kosong'),
})

function ChangePassword(props) {
	const params = useParams()
	const history = useHistory()
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(null)
	const {
		register,
		handleSubmit,
		formState,
		setError: setFormError,
		errors,
	} = useForm({
		resolver: yupResolver(validationSchema),
	})
	const {isSubmitting} = formState

	const onSubmit = async ({newPassword, passwordConfirmation}) => {
		if (newPassword !== passwordConfirmation) {
			return setFormError('passwordConfirmation', {
				type: 'manual',
				message: 'Password tidak cocok',
			})
		}

		try {
			await axios.post('/user/resetPassword', {
				newPassword,
				token: params.token,
			})
			history.replace('/resetPassword/successChange', {
				success: true,
			})
		} catch (err) {
			if (err.response) {
				setError(error.response.data)
			}
		}
	}

	React.useEffect(() => {
		axios
			.get(`/user/resetPassword/confirmation/${params.token}`)
			.then(() => {
				setLoading(false)
			})
			.catch((err) => {
				if (err.response) {
					setLoading(false)
					setError(err.response.data)
				}
			})
	}, [])

	if (loading) {
		return <Spinner />
	}

	if (error?.code === 404) {
		return <div>{error.message}</div>
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
			<Head title="Reset password" />
			<Heading color="green.400" size="lg" mb="6" textTransform="uppercase">
				Reset password
			</Heading>
			<Stack
				as="form"
				onSubmit={handleSubmit(onSubmit)}
				spacing="5"
				shouldWrapChildren
			>
				<PasswordInput
					ref={register}
					name="newPassword"
					placeholder="Masukan password baru kamu"
					error={errors?.newPassword}
				/>
				<PasswordInput
					ref={register}
					name="passwordConfirmation"
					placeholder="Masukan kembali password baru kamu"
					error={errors?.passwordConfirmation}
				/>
				<Button type="submit" block isDisabled={isSubmitting}>
					{isSubmitting ? 'Mereset password ...' : 'Reset'}
				</Button>
				<Box color="red.500">{error ? error.message : null}</Box>
			</Stack>
		</Box>
	)
}

export default ChangePassword
