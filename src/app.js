import React from 'react'

import Theme from './libs/theme'
import {AuthProvider} from './libs/auth'
import Routes from './routes'

function App() {
	return (
		<Theme>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</Theme>
	)
}

export default App
