import React from 'react'
import {Box} from '@chakra-ui/core'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Dashboard({children, title}) {
  return (
    <Box backgroundColor="gray.50" minHeight="100vh">
      <Sidebar />
      <Box marginLeft="300px" paddingTop="6" paddingRight="8" paddingBottom="8">
        <Topbar title={title} />
        {children}
      </Box>
    </Box>
  )
}

export default Dashboard
