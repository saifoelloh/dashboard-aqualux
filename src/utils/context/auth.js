import PropsTypes from 'prop-types'
import React, { createContext, useReducer } from 'react'

const sessionAuth = sessionStorage.getItem('auth')
const sessionState = sessionAuth !== null ? JSON.parse(sessionAuth) : {}
const initialState = {
  nama: '',
  jabatan: '',
  email: '',
  isAuthenticate: true,
  isUwu: true,
  ...sessionState,
}

const intialAction = {
  type: '',
  payload: [],
}

const authReducer = (state = initialState, action = intialAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...action.payload,
        isAuthenticate: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}

const AuthContext = createContext()

const AuthProvider = ({ children = PropsTypes.node }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropsTypes.node.isRequired,
}

export { AuthContext, AuthProvider }
