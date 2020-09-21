import React from 'react'
import {Flex, Box, Stack} from '@chakra-ui/core'

import {MainData, OftenSupply, RarelySupply} from 'components/Suppliers'
import Dashboard from 'shared/Dashboard'
import Head from 'shared/Head'

function Suppliers() {
  return (
    <Dashboard title="Data suppliers">
      <Head title="Data suppliers" />
      <Flex alignItems="flex-start">
        <Box width="65%">
          <MainData />
        </Box>
        <Stack width="35%" spacing={6} marginLeft="6" shouldWrapChildren>
          <OftenSupply />
          <RarelySupply />
        </Stack>
      </Flex>
    </Dashboard>
  )
}

export default Suppliers
