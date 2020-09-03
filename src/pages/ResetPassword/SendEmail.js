import React from 'react'
import {Box, Flex, Heading, Text} from '@chakra-ui/core'
import {useLocation, Redirect} from 'react-router-dom'

import Button from 'shared/Button'
import Head from 'shared/Head'
import axios from 'libs/axios'

function SendEmail() {
  const location = useLocation()
  const [wait, setWait] = React.useState(60)
  const [loading, setLoading] = React.useState(false)

  const send = () => {
    setLoading(true)
    axios
      .post('/user/resetPassword/request', {
        email: location.state.email
      })
      .then(() => {
        setWait(60)
        setLoading(false)
      })
      .catch((err) => console.log('error from sendEmail: ', err))
  }

  React.useEffect(() => {
    let countdown
    if (wait > 0) {
      countdown = setInterval(() => {
        setWait((prevValue) => prevValue - 1)
      }, 1000)
    } else {
      clearInterval(countdown)
    }

    return () => {
      clearInterval(countdown)
    }
  }, [wait])

  if (!location.state?.email) {
    return <Redirect to="/resetPassword" />
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
      <Head title="Email berhasil dikirim" />
      <Heading color="green.400" mb="2" size="lg" textTransform="uppercase">
        Email berhasil dikirim!
      </Heading>
      <Text color="gray.600" mb="3">
        {`Kami telah mengirim email ke ${location.state?.email}, klik tautan pada email untuk melanjutkan reset password`}
      </Text>{' '}
      <Text color="gray.600" mb="2" fontSize="0.9rem">
        Belum menerima email?
      </Text>
      <Flex alignItems="center">
        <Button type="submit" onClick={send} isDisabled={loading || wait}>
          {loading ? 'Mengirim ...' : 'Kirim ulang'}
        </Button>
        <Text color="gray.600" ml="2" fontSize="0.9rem">
          {wait}
        </Text>
      </Flex>
    </Box>
  )
}

export default SendEmail
