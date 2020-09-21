import React from 'react'
import useSWR from 'swr'
import {Text} from '@chakra-ui/core'

import Data from 'shared/Data'
import {useAuth} from 'libs/auth'
import axios from 'libs/axios'
import Skeleton from 'shared/Skeleton'

export function OftenSupply() {
  const {user} = useAuth()
  const {data: suppliers} = useSWR(
    `/store/${user.store.id}/suppliers/oftenSupply`,
    (url) =>
      axios
        .get(url, {
          withCredentials: true
        })
        .then((res) => res.data)
  )
  return (
    <Data.Container>
      <Text as="h3" fontWeight="700" marginBottom="4" fontSize="1.3rem">
        Sering memasok
      </Text>
      <Data.ViewContainer>
        <Data.ViewGroup
          backgroundColor="blue.800"
          fontWeight="bold"
          color="white"
        >
          <Data.LeftElement>#</Data.LeftElement>
          <Data.ViewContent>Nama</Data.ViewContent>
          <Data.ViewContent>Total supply</Data.ViewContent>
        </Data.ViewGroup>
        {!suppliers ? (
          <Skeleton count={5} height="30px" my="5px" />
        ) : (
          suppliers.data.map((supplier, idx) => {
            const backgroundColor = idx % 2 === 1 ? 'gray.200' : 'gray.50'
            return (
              <Data.ViewGroup
                key={supplier.id}
                backgroundColor={backgroundColor}
              >
                <Data.LeftElement>{idx + 1}</Data.LeftElement>
                <Data.ViewContent>{supplier.name}</Data.ViewContent>
                <Data.ViewContent>{supplier.total}</Data.ViewContent>
              </Data.ViewGroup>
            )
          })
        )}
      </Data.ViewContainer>
    </Data.Container>
  )
}

export function RarelySupply() {
  const {user} = useAuth()
  const {data: suppliers} = useSWR(
    `/store/${user.store.id}/suppliers/rarelySupply`,
    (url) =>
      axios
        .get(url, {
          withCredentials: true
        })
        .then((res) => res.data)
  )

  return (
    <Data.Container>
      <Text as="h3" fontWeight="700" marginBottom="4" fontSize="1.3rem">
        Jarang memasok
      </Text>
      <Data.ViewContainer>
        <Data.ViewGroup
          backgroundColor="blue.800"
          fontWeight="bold"
          color="white"
        >
          <Data.LeftElement>#</Data.LeftElement>
          <Data.ViewContent>Nama</Data.ViewContent>
          <Data.ViewContent>Total supply</Data.ViewContent>
        </Data.ViewGroup>
        {!suppliers ? (
          <Skeleton count={5} height="30px" my="5px" />
        ) : (
          suppliers.data.map((supplier, idx) => {
            const backgroundColor = idx % 2 === 1 ? 'gray.200' : 'gray.50'
            return (
              <Data.ViewGroup
                key={supplier.id}
                backgroundColor={backgroundColor}
              >
                <Data.LeftElement>{idx + 1}</Data.LeftElement>
                <Data.ViewContent>{supplier.name}</Data.ViewContent>
                <Data.ViewContent>{supplier.total}</Data.ViewContent>
              </Data.ViewGroup>
            )
          })
        )}
      </Data.ViewContainer>
    </Data.Container>
  )
}
