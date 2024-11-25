import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import localAvailableStorage from '../utils/localAvailableStorage';
import {ARESContext} from './ARESContext';
import aReS from '../../../../ares';

const initialState = aReS.contextSettings?.auth?.initialState || {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  role: null,
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('authReducer::login', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case 'LOGOUT':
      return initialState;
    case 'SET_PROFILE':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({children}) => {
  const availableStorage = localAvailableStorage();
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {state: aresState} = useContext(ARESContext);

  const login = useCallback(() => {
    console.log('login');
    aReS.contextSettings?.auth?.login(aresState, dispatch, availableStorage), [aresState, availableStorage];
  }
);

  const logout = useCallback(() => aReS.contextSettings?.auth?.logout(aresState, dispatch, availableStorage), [aresState, availableStorage]);

  const getProfile = useCallback(() => aReS.contextSettings?.auth?.getProfile(aresState, dispatch, availableStorage), [aresState, availableStorage]);
  
  const refreshToken = useCallback(() => aresState.contextSettings?.auth?.refreshToken(aresState, dispatch, availableStorage), [aresState, availableStorage]);

  const validateToken = useCallback(() => aReS.contextSettings?.auth?.validateToken(aresState, dispatch, availableStorage, refreshToken), [aresState, refreshToken, availableStorage]);

  useEffect(() => {
    const init = async () => {
      await validateToken();
    };
    init();
  }, [validateToken]);

  return (
    <AuthContext.Provider
      value={{...state, login, logout, getProfile, validateToken, refreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

 