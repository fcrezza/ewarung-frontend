import React from 'react'
import {
	FormControl,
	FormErrorMessage,
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

function ErrorMessage({isInvalid, children}) {
	return <FormErrorMessage isInvalid={isInvalid}>{children}</FormErrorMessage>
}

const InputField = React.forwardRef((props, ref) => {
	const {name, type, placeholder, isInvalid, ...otherProps} = props

	return (
		<ChakraInput
			ref={ref}
			type={type}
			name={name}
			id={name}
			placeholder={placeholder}
			isInvalid={isInvalid}
			focusBorderColor="green.400"
			errorBorderColor="red.300"
			{...otherProps}
		/>
	)
})

const Input = React.forwardRef((props, ref) => {
	const {name, placeholder, error, ...otherProps} = props

	return (
		<FormControl>
			<InputLabel name={name}>{placeholder}</InputLabel>
			<InputField
				name={name}
				ref={ref}
				placeholder={`Masukan ${placeholder} Kamu`}
				isInvalid={!!error}
				{...otherProps}
			/>
			<ErrorMessage isInvalid={!!error}>{error?.message}</ErrorMessage>
		</FormControl>
	)
})

const PasswordInput = React.forwardRef((props, ref) => {
	const [show, setShow] = React.useState(false)
	const {error, ...otherProps} = props

	return (
		<FormControl>
			<InputLabel color="gray.700" name="password">
				Password
			</InputLabel>
			<InputGroup>
				<InputField
					ref={ref}
					name="password"
					type={show ? 'text' : 'password'}
					placeholder="Masukan Password Kamu"
					isInvalid={!!error}
					{...otherProps}
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
			<ErrorMessage isInvalid={!!error}>{error?.message}</ErrorMessage>
		</FormControl>
	)
})

export {Input, PasswordInput}
