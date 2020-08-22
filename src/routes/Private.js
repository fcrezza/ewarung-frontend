import React from 'react'
import {Route, Redirect} from 'react-router-dom'

import Spinner from 'components/Spinner'
import {useAuth} from 'libs/auth'

function PrivateRoute({children, ...props}) {
	const {user} = useAuth()

	if (!user && user !== null) {
		return <Spinner />
	}

	if (!user) {
		return <Redirect to="/login" />
	}

	if (!user?.user.isVerified) {
		return (
			<Redirect
				to={{
					pathname: '/accountVerification',
					state: {
						user: user?.user,
					},
				}}
			/>
		)
	}

	return <Route {...props}>{children}</Route>
}

export default PrivateRoute
