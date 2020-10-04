import React from 'react'
import {FaCaretDown, FaCaretUp} from 'react-icons/fa'
import {
  Box,
  Flex,
  IconButton,
  PseudoBox,
  Text,
  Tooltip,
  Stack
} from '@chakra-ui/core'

import OverlayScrollbar from 'shared/OverlayScrollbar'

function Container({children}) {
  return (
    <Box backgroundColor="white" padding="6" rounded="md" boxShadow="md">
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

function ActionWrapper({children}) {
  return (
    <Stack alignItems="center" spacing="10px" shouldWrapChildren isInline>
      {children}
    </Stack>
  )
}

function Button({color, onClick, icon, ariaLabel, isDisabled, tooltipText}) {
  return (
    <Tooltip label={tooltipText}>
      <IconButton
        color={color}
        aria-label={ariaLabel}
        icon={icon}
        variant="ghost"
        onClick={onClick}
        isDisabled={isDisabled}
      />
    </Tooltip>
  )
}

function ViewContainer({children}) {
  return <Box>{children}</Box>
}

function ViewHead({children, onClick, name, sortBy}) {
  return (
    <PseudoBox
      as="button"
      onClick={onClick}
      flex="1"
      padding="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={name === sortBy.name ? 'blue.900' : null}
      whiteSpace="nowrap"
      overflowX="auto"
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
      {sortBy.name === name && sortBy.order === 'desc' ? (
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
      <OverlayScrollbar>
        <Text>{children}</Text>
      </OverlayScrollbar>
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

function LeftElement({children, ...props}) {
  return (
    <Flex
      alignSelf="stretch"
      alignItems="center"
      justifyContent="center"
      borderRight="2px dashed white"
      paddingX="2"
      width="40px"
    >
      {children}
    </Flex>
  )
}

export {
  Button,
  ActionWrapper,
  ButtonGroup,
  Container,
  ViewContainer,
  ViewHead,
  LeftElement,
  ViewContent,
  ViewGroup
}
