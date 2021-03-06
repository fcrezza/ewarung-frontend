import {useState} from 'react'

function useSort(name = 'id', order = 'desc') {
  const [sortBy, setSortBy] = useState({name, order})

  const sortItemBy = (name) => {
    if (sortBy.name === name && sortBy.order === 'asc') {
      setSortBy((state) => ({
        ...state,
        order: 'desc'
      }))
    } else {
      setSortBy({
        name: name,
        order: 'asc'
      })
    }
  }

  return {sortBy, sortItemBy}
}

export default useSort
