import React from 'react'
import {
	FormControl,
	FormLabel,
	Input as ChakraInput,
	InputRightElement,
	InputGroup,
	Button,
} from '@chakra-ui/core'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

function InputLabel({name, children}) {
	return (
		<FormLabel color="gray.700" htmlFor={name}>
			{children}
		</FormLabel>
	)
}

function InputField({name, type, placeholder}) {
	return (
		<ChakraInput
			type={type}
			name={name}
			id={name}
			placeholder={placeholder}
			focusBorderColor="green.400"
		/>
	)
}

function Input({name, placeholder, ...props}) {
	return (
		<FormControl>
			<InputLabel name={name}>{placeholder}</InputLabel>
			<InputField
				name={name}
				placeholder={`Masukan ${placeholder} Kamu`}
				{...props}
			/>
		</FormControl>
	)
}

function PasswordInput() {
	const [show, setShow] = React.useState(false)

	return (
		<FormControl>
			<InputLabel color="gray.700" name="password">
				Password
			</InputLabel>
			<InputGroup>
				<InputField
					name="password"
					type={show ? 'text' : 'password'}
					placeholder="Masukan Password Kamu"
				/>
				<InputRightElement>
					<Button
						p="0"
						h="1.75rem"
						mr="4"
						bg="gray.100"
						fontSize="xl"
						onClick={() => setShow((prevState) => !prevState)}
					>
						{show ? <AiFillEyeInvisible /> : <AiFillEye />}
					</Button>
				</InputRightElement>
			</InputGroup>
		</FormControl>
	)
}

export {Input, PasswordInput}
