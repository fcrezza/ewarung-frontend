import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import ResetPassword from 'pages/ResetPassword'
import SendEmail from 'pages/ResetPassword/SendEmail'
import ChangePassword from 'pages/ResetPassword/ChangePassword'
import SuccessChange from 'pages/ResetPassword/SuccessChange'

function ResetPasswordRoutes() {
	const match = useRouteMatch()

	return (
		<Switch>
			<Route path={`${match.path}/sendEmail`}>
				<SendEmail />
			</Route>
			<Route path={`${match.path}/changePassword/:token`}>
				<ChangePassword />
			</Route>
			<Route path={`${match.path}/successChange`}>
				<SuccessChange />
			</Route>
			<Route path={match.path}>
				<ResetPassword />
			</Route>
		</Switch>
	)
}

export default ResetPasswordRoutes
