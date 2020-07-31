import React from 'react'
import {Box, Flex, Heading, Stack, Text, Divider} from '@chakra-ui/core'

import {Input, PasswordInput} from 'components/Input'
import Button from 'components/Button'
import Link from 'components/Link'
import Head from 'components/Head'
import heroImage from 'images/hero.jpg'

function login() {
	return (
		<>
			<Head title="Masuk" />
			<Flex w="100%" h="100vh">
				<LeftSection />
				<RightSection />
			</Flex>
		</>
	)
}

function LeftSection() {
	return (
		<Box
			pos="relative"
			flex="2"
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
	)
}

function RightSection() {
	return (
		<Box flex="3" p="6" pos="relative">
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
				<Heading color="green.400" size="lg" mb="6" textTransform="uppercase">
					Masuk
				</Heading>
				<Stack as="form" spacing="5" shouldWrapChildren>
					<Input placeholder="Username" name="username" autoFocus />
					<PasswordInput />
					<Button block>Masuk</Button>
				</Stack>
				<Flex mt="8">
					<Text color="gray.600">
						Lupa password ? <Link to="/resetPassword">Reset password</Link>
					</Text>
				</Flex>
			</Box>
			<Footer />
		</Box>
	)
}

function Footer() {
	return (
		<Box pos="absolute" bottom="6" left="6" right="6">
			<Divider mb="4" borderColor="gray.300" />
			<Text textAlign="center" color="gray.600">
				Made by{' '}
				<Link href="https://twitter.com/fcrezza" isExternal>
					Anang Fachreza
				</Link>
			</Text>
		</Box>
	)
}

export default login