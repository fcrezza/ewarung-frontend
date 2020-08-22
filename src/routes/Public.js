import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import Spinner from 'components/Spinner'
import {useAuth} from 'libs/auth'

function PublicRoute({children, ...props}) {
	const {user} = useAuth()

	if (!user && user !== null) {
		return <Spinner />
	}

	return user?.user ? (
		<Redirect to="/dashboard/overview" />
	) : (
		<Route {...props}>{children}</Route>
	)
}

export default PublicRoute
