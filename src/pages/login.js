import React from 'react'
import {Box, Flex, Heading, Stack, Text} from '@chakra-ui/core'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import {object, string} from 'yup'

import {Input, PasswordInput} from 'components/Input'
import Button from 'components/Button'
import Link from 'components/Link'
import Head from 'components/Head'
import heroImage from 'images/hero.jpg'
import {useAuth} from 'libs/auth'

const validationSchema = object().shape({
	username: string().required('Username tidak boleh kosong'),
	password: string().required('Password tidak boleh kosong'),
})

function Login() {
	const {login} = useAuth()
	const [error, setError] = React.useState(null)
	const {register, handleSubmit, errors, formState} = useForm({
		resolver: yupResolver(validationSchema),
	})
	const {isSubmitting} = formState

	const onSubmit = async (formData) => {
		try {
			await login(formData)
		} catch (err) {
			if (err.response) {
				setError(err.response.data)
			}
		}
	}

	return (
		<Box>
			<Head title="Masuk" />
			<Box
				backgroundColor="red.500"
				display={error ? 'block' : 'none'}
				textAlign="center"
				p="2"
				color="gray.100"
			>
				{error ? error.message : null}
			</Box>
			<Flex w="100%" h="100vh">
				<Box
					pos="relative"
					flex="1"
					p="10"
					bgImage={`url(${heroImage})`}
					bgSize="cover"
					bgRepeat="no-repeat"
				>
					<Heading color="white" size="xl" mb="2" textTransform="uppercase">
						E-Warung
					</Heading>
					<Text fontSize="lg" color="gray.200">
						Manage warung dengan aman dan mudah
					</Text>
					<Box pos="absolute" bottom="10">
						<Text color="gray.200">
							Foto dari Hiep Duong sumber:{' '}
							<Link href="https://unsplash.com/photos/rq2zfKkMgIU" isExternal>
								unsplash.com
							</Link>
						</Text>
					</Box>
				</Box>
				<Box flex="2" p="6" pos="relative">
					<Box textAlign="right">
						<Link to="/signup">Daftar</Link>
					</Box>
					<Box
						mt="16"
						maxWidth="450px"
						mx="auto"
						rounded="lg"
						p="8"
						border="1px"
						borderColor="gray.300"
					>
						<Heading
							color="green.400"
							size="lg"
							mb="6"
							textTransform="uppercase"
						>
							Masuk
						</Heading>
						<Stack
							as="form"
							onSubmit={handleSubmit(onSubmit)}
							spacing="5"
							shouldWrapChildren
						>
							<Input
								placeholder="Username"
								name="username"
								ref={register({required: true})}
								error={errors?.username}
								autoFocus
							/>
							<PasswordInput
								ref={register({required: true})}
								error={errors?.password}
								name="password"
								placeholder="Masukan password kamu"
							/>
							<Button type="submit" block isDisabled={isSubmitting}>
								{isSubmitting ? 'Masuk ...' : 'Masuk'}
							</Button>
						</Stack>
						<Flex mt="8">
							<Text color="gray.600">
								Lupa password ? <Link to="/resetPassword">Reset password</Link>
							</Text>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</Box>
	)
}

export default Login
