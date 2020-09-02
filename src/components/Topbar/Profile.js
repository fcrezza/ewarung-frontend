import React from 'react'
import {
	Avatar,
	Flex,
	Box,
	Text,
	Button as ChakraButton,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
} from '@chakra-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import Button from './Button'
import {useAuth} from 'libs/auth'
import {RiArrowDownSLine} from 'react-icons/ri'

function Profile() {
	const {logout, user} = useAuth()

	return (
		<Popover placement="bottom">
			<PopoverTrigger>
				<Flex
					as={ChakraButton}
					aria-label="options"
					padding="2"
					minWidth="150px"
					alignItems="center"
					justifyContent="space-between"
				>
					<Flex alignItems="center">
						<Avatar size="sm" marginRight="2" />
						<Text>{user.user.username}</Text>
					</Flex>
					<Box as={RiArrowDownSLine} />
				</Flex>
			</PopoverTrigger>
			<PopoverContent maxWidth="150px" FlexShadow="md">
				<PopoverArrow />
				<PopoverBody padding="0" display="flex" flexDirection="column">
					<Button
						as={RouterLink}
						to="/dashboard/profile"
						borderBottom="1px"
						borderBottomColor="gray.200"
					>
						Profile
					</Button>
					<Button onClick={logout}>Logout</Button>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}

export default Profile
