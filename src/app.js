import React from 'react'

import Theme from './libs/theme'
import DataFetchingConfig from './libs/DataFetchingConfig'
import {AuthProvider} from './libs/auth'
import Routes from './routes'

function App() {
  return (
    <Theme>
      <DataFetchingConfig>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </DataFetchingConfig>
    </Theme>
  )
}

export default App
