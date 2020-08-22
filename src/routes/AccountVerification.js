import React from 'react'
import {Route, useRouteMatch, Switch} from 'react-router-dom'

import {VerifyAccount, Confirmation} from 'pages/AccountVerification'

function AccountVerificationRoute() {
	const match = useRouteMatch()
	return (
		<Switch>
			<Route path={`${match.path}/confirmation/:token`}>
				<Confirmation />
			</Route>
			<Route path={match.path}>
				<VerifyAccount />
			</Route>
		</Switch>
	)
}

export default AccountVerificationRoute
