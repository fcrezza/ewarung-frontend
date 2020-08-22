import React from 'react'
import {
	Avatar,
	Button as ChakraButton,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
} from '@chakra-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import {RiUser3Line, RiLogoutBoxLine} from 'react-icons/ri'

import Button from './Button'
import {useAuth} from 'libs/auth'

function Profile() {
	const {logout} = useAuth()

	return (
		<Popover placement="bottom">
			<PopoverTrigger>
				<ChakraButton>
					<Avatar />
				</ChakraButton>
			</PopoverTrigger>
			<PopoverContent maxWidth="150px" boxShadow="md">
				<PopoverArrow />
				<PopoverBody padding="0" display="flex" flexDirection="column">
					<Button
						as={RouterLink}
						to="/dashboard/profile"
						borderBottom="1px"
						borderBottomColor="gray.200"
						icon={RiUser3Line}
					>
						Profile
					</Button>
					<Button onClick={logout} icon={RiLogoutBoxLine}>
						Logout
					</Button>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}

export default Profile
