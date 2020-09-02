import {useState, useEffect} from 'react'

function useDebounce(delay) {
	const [value, setValue] = useState('')
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)
		return () => {
			clearTimeout(handler)
		}
	}, [value])

	return [value, debouncedValue, setValue]
}

export default useDebounce
