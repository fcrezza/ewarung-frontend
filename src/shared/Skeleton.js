import React from 'react'
import {Skeleton as ChakraSkeleton} from '@chakra-ui/core'

function Skeleton({count = 1, ...props}) {
  const skeletonArr = []
  for (let i = 0; i < count; i++) {
    skeletonArr.push(<ChakraSkeleton key={i} {...props} />)
  }

  return skeletonArr
}

export default Skeleton
