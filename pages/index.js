import React from 'react'
import DashboardComponent from "../src/components/index/DashboardComponent"
import PrivateRoute from '../src/components/global/PrivateRoute'

export default function Index() {
  return (
    <PrivateRoute>
        <DashboardComponent />
    </PrivateRoute>
  )
}
