import React from 'react'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {
	NumberInput as ChakraNumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormControl,
	Input as ChakraInput,
	InputRightElement,
	InputGroup,
	Button
} from '@chakra-ui/core'

import Label from './Label'
import ErrorMessage from './ErrorMessage'

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
			<Label name={name}>{placeholder}</Label>
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

const InputV2 = ({name, inputLabel, isRequired, error, ...props}) => {
	return (
		<FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
			<Label name={name}>{inputLabel}</Label>
			<InputField name={name} isInvalid={Boolean(error)} {...props} />
			<ErrorMessage isInvalid={Boolean(error)}>{error?.message}</ErrorMessage>
		</FormControl>
	)
}

const NumberInput = ({id, inputLabel, isRequired, error, ...props}) => {
	return (
		<FormControl isRequired={isRequired} isInvalid={Boolean(error)}>
			<Label name={id}>{inputLabel}</Label>
			<ChakraNumberInput min={0} isInvalid={Boolean(error)} {...props}>
				<NumberInputField id={id} type="number" />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</ChakraNumberInput>
			<ErrorMessage isInvalid={Boolean(error)}>{error?.message}</ErrorMessage>
		</FormControl>
	)
}

const PasswordInput = React.forwardRef((props, ref) => {
	const [show, setShow] = React.useState(false)
	const {error, name, placeholder, ...otherProps} = props

	return (
		<FormControl>
			<Label color="gray.700" name="password">
				Password
			</Label>
			<InputGroup>
				<InputField
					ref={ref}
					name={name}
					type={show ? 'text' : 'password'}
					placeholder={placeholder}
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

export {Input, PasswordInput, InputV2, NumberInput}
