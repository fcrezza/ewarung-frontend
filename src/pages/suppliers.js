import React from 'react'

import Dashboard from 'shared/Dashboard'
import Head from 'shared/Head'
import Data from 'shared/Data'
import Button from 'shared/Button'
import Pagination from 'shared/Pagination'
import Search from 'shared/Search'
import {useAuth} from 'libs/auth'
import useSearch from 'libs/useSearch'
import axios from 'libs/axios'

function Suppliers() {
  return (
    <Dashboard title="Data suppliers">
      <Head title="Data suppliers" />
    </Dashboard>
  )
}

export default Suppliers
