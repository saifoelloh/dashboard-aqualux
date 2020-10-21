import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from 'utils/context'
import { MainRoutes } from 'utils/route'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
