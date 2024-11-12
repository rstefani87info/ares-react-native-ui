import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import localAvailableStorage from '../utils/localAvailableStorage';
import {ARESContext} from './ARESContext';
import aReS from '../../../../../ares';

const initialState = aReS.contextSettings?.auth?.initialState || {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  role: null,
  listEventType: [],
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
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

  const login = useCallback(aReS.contextSettings?.auth?.login(aresState, dispatch, availableStorage), [aresState, availableStorage]);

  const logout = useCallback(aReS.contextSettings?.auth?.login(aresState, dispatch, availableStorage), [aresState, availableStorage]);

  const getProfile = useCallback(aReS.contextSettings?.auth?.login(aresState, dispatch, availableStorage), [aresState, availableStorage]);

  const validateToken = useCallback(aReS.contextSettings?.auth?.validateToken(aresState, dispatch, availableStorage, refreshToken), [aresState, refreshToken, availableStorage]);

  const refreshToken = useCallback(aresState.contextSettings?.auth?.refreshToken(aresState, dispatch, availableStorage), [aresState, availableStorage]);

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

const handleGoogleSignInError = error => {
  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    console.error('User cancelled the login process');
  } else if (error.code === statusCodes.IN_PROGRESS) {
    console.error('Sign in is already in progress');
  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    console.error('Google Play Services not available or outdated');
  } else {
    console.error('Sign in error:', error);
    console.error('stack', error.stack);
  }


  
};

async function getUserAdditionalInfo(accessToken) {
  try {
    const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=birthdays,genders', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    console.log('User additional info:', data);

  } catch (error) {
    console.error('Error getting user additional info:', error);
  }
}
