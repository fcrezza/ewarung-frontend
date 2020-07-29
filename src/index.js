import React from 'react'
import ReactDOM from 'react-dom'

import App from 'app'
import * as serviceWorker from 'serviceWorker'
import Theme from 'libs/theme'

ReactDOM.render(
	<React.StrictMode>
		<Theme>
			<App />
		</Theme>
	</React.StrictMode>,
	document.getElementById('root')
)

serviceWorker.unregister()
