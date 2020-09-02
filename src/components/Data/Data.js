import React from 'react'
import {FaCaretDown, FaCaretUp} from 'react-icons/fa'
import {Box, Flex, Link, PseudoBox, Text, Stack} from '@chakra-ui/core'

import Checkbox from 'components/Checkbox'

function Container({children}) {
  return (
    <Box
      maxWidth="750px"
      flex="2"
      backgroundColor="white"
      padding="6"
      rounded="md"
      boxShadow="md"
    >
      {children}
    </Box>
  )
}

function ButtonGroup({children}) {
  return (
    <Stack spacing="4" shouldWrapChildren isInline>
      {children}
    </Stack>
  )
}

function Button({color, onClick, children}) {
  return (
    <Link as="button" color={color} fontWeight="500" onClick={onClick}>
      {children}
    </Link>
  )
}

function ViewContainer({children}) {
  return <Box>{children}</Box>
}

function ViewHead({children, onClick, name, sort}) {
  return (
    <PseudoBox
      as="button"
      onClick={onClick}
      width="25%"
      padding="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={name === sort?.name ? 'blue.900' : null}
      _hover={{
        backgroundColor: 'blue.900'
      }}
      _focus={{
        backgroundColor: 'blue.900'
      }}
    >
      <Text as="h3" fontWeight="700" color="white">
        {children}
      </Text>
      {sort?.name === name && sort?.order === 'desc' ? (
        <FaCaretUp color="#fff" />
      ) : (
        <FaCaretDown color="#fff" />
      )}
    </PseudoBox>
  )
}

function ViewContent({children, isHead, ...props}) {
  return (
    <Box flex="1" overflowX="auto" padding="2" whiteSpace="nowrap">
      <Text>{children}</Text>
    </Box>
  )
}

function ViewGroup({children, backgroundColor, ...props}) {
  return (
    <Flex alignItems="center" backgroundColor={backgroundColor} {...props}>
      {children}
    </Flex>
  )
}

function LeftElement({children}) {
  return (
    <Box
      borderRight="2px dashed white"
      padding="2"
      width="40px"
      marginRight="1rem"
    >
      {children}
    </Box>
  )
}

function CheckOption({onChange, isChecked}) {
  return (
    <Box borderRight="2px dashed white" marginRight="1rem">
      <Checkbox onChange={onChange} isChecked={isChecked} />
    </Box>
  )
}

export {
  Button,
  ButtonGroup,
  Container,
  ViewContainer,
  ViewHead,
  LeftElement,
  ViewContent,
  ViewGroup,
  CheckOption
}
