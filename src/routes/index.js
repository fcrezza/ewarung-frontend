import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Login from 'pages/login'
import Signup from 'pages/signup'
import ResetPassword from './ResetPassword'
import Suppliers from 'pages/suppliers'
import AccountVerification from './AccountVerification'
import Overview from 'pages/overview'
import Transaction from 'pages/transaction'
import Histories from 'pages/histories'
import Inventory from 'pages/inventory'
import Profile from 'pages/profile'
import NotFound from 'pages/404'
import PublicRoute from './Public'
import PrivateRoute from './Private'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/">
          <Redirect to="/login" />
        </PublicRoute>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/signup">
          <Signup />
        </PublicRoute>
        <Route path="/accountVerification">
          <AccountVerification />
        </Route>
        <PublicRoute path="/resetPassword">
          <ResetPassword />
        </PublicRoute>
        <PrivateRoute exact path="/dashboard">
          <Redirect to="/dashboard/overview" />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/overview">
          <Overview />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/transaction">
          <Transaction />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/transaction-histories">
          <Histories />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/inventory">
          <Inventory />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/suppliers">
          <Suppliers />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/profile">
          <Profile />
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
