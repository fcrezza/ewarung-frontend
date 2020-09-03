import React from 'react'
import {useParams, Link as RouterLink} from 'react-router-dom'
import {Box, Heading} from '@chakra-ui/core'
import {mutate} from 'swr'

import Head from 'shared/Head'
import Button from 'shared/Button'
import Spinner from 'shared/Spinner'
import axios from 'libs/axios'

function Confirmation() {
  const params = useParams()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    axios
      .post('/user/accountVerification/confirmation', params)
      .then(() => {
        mutate('/user')
        setLoading(false)
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data)
          setLoading(false)
        }
      })
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <Box
      w="100%"
      maxWidth="450px"
      pos="absolute"
      p="8"
      border="1px"
      borderColor="gray.300"
      rounded="lg"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Head title="Akun anda berhasil diverifikasi" />
      <Heading color="green.400" mb="2" size="lg" textTransform="uppercase">
        Akun anda berhasil diverifikasi
      </Heading>
      <Button as={RouterLink} to="/dashboard/overview">
        Kembali
      </Button>
    </Box>
  )
}

export default Confirmation
