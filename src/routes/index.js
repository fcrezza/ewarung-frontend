import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from 'pages/login'
import Signup from 'pages/signup'
import ResetPassword from 'pages/resetPassword'

function routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route path="/resetPassword" component={ResetPassword} />
			</Switch>
		</BrowserRouter>
	)
}

export default routes
