import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'

import {Box, Flex, Heading, Text} from '@chakra-ui/core'
import Button from 'shared/Button'
import Spinner from 'shared/Spinner'
import Head from 'shared/Head'
import axios from 'libs/axios'

function VerifyAccount() {
  const location = useLocation()
  const history = useHistory()
  const [wait, setWait] = React.useState(60)
  const [loading, setLoading] = React.useState(true)

  const send = async () => {
    setLoading(true)
    await axios.post('/user/accountVerification/request', {
      username: location.state.user
    })
    setWait(60)
    setLoading(false)
  }

  React.useEffect(() => {
    const requestVerifyAccount = () => {
      if (location.state?.user) {
        axios
          .post('/user/accountVerification/request', {
            username: location.state.user.username
          })
          .then(() => {
            setLoading(false)
          })
      } else {
        history.replace('/')
      }
    }

    requestVerifyAccount()
  }, [])

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

  if (loading) {
    return <Spinner />
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
      <Head title="Verifikasi akun" />
      <Heading color="green.400" mb="2" size="lg" textTransform="uppercase">
        Verifikasi akun
      </Heading>
      <Text color="gray.600" mb="3">
        {`Kami telah mengirim email ke ${location.state?.user.email}, klik tautan pada email untuk melakukan verifikasi akun`}
      </Text>
      <Text color="gray.600" mb="2" fontSize="0.9rem">
        Belum menerima email?
      </Text>
      <Flex alignItems="center">
        <Button type="submit" onClick={send} isDisabled={loading || wait}>
          {loading ? 'Mengirim email ...' : 'Kirim ulang'}
        </Button>
        <Text
          color="gray.600"
          ml="2"
          fontSize="0.9rem"
          visibility={wait ? 'visible' : 'hidden'}
        >
          {wait}
        </Text>
      </Flex>
    </Box>
  )
}

export default VerifyAccount
