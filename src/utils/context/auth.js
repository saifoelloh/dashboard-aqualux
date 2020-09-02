import PropsTypes from 'prop-types'
import React, { createContext, useReducer } from 'react'

const initialState = {
  username: '',
  email: '',
  token: '',
  role: '',
  expire: 0,
  isAuthenticate: false,
}

const intialAction = {
  type: '',
  payload: [],
}

const authReducer = (state = initialState, action = intialAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
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
