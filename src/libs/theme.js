import React from 'react'
import {theme, CSSReset, ThemeProvider as Provider} from '@chakra-ui/core'
import 'typeface-roboto'

const customTheme = {
	...theme,
	fonts: {
		heading: '"Roboto", sans-serif',
		body: '"Roboto", sans-serif',
		mono: 'Menlo, monospace',
	},
}

function ThemeProvider({children}) {
	return (
		<Provider theme={customTheme}>
			<CSSReset />
			{children}
		</Provider>
	)
}

export default ThemeProvider
