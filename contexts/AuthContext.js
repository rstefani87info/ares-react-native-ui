import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import localAvailableStorage from '../utils/localAvailableStorage';
import {config} from '../config';
import {aReSContext} from './ARESContext';

const defaultInitialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  role: null,
};

const AuthContext = createContext(defaultInitialState);

const createAuthReducer = (initialState) => (state, action) => {
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
  const aresContextValue = useContext(aReSContext);
  if (!aresContextValue?.state) {
    throw new Error('AuthProvider requires ARESProvider. Wrap your app with <ApplicationRoot> or <ARESProvider>.');
  }
  const {state: aresState} = aresContextValue;
  const aReS = aresState.aReS;
  if (!aReS) {
    const message = 'ARES instance not configured in @ares/react-native-ui. Call setConfig({ ares }) before rendering.';
    config.logger?.error?.(message);
    throw new Error(message);
  }

  const initialState = useMemo(() => aReS?.contextSettings?.auth?.initialState || defaultInitialState, [aReS]);
  const authReducer = useMemo(() => createAuthReducer(initialState), [initialState]);

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback(() => {
    return aReS?.contextSettings?.auth?.login(
      aresState,
      dispatch,
      availableStorage,
    );
  }, [aReS, aresState, availableStorage]);

  const logout = useCallback(() => aReS?.contextSettings?.auth?.logout(aresState, dispatch, availableStorage), [aReS, aresState, availableStorage]);

  const getProfile = useCallback(() => aReS?.contextSettings?.auth?.getProfile(aresState, dispatch, availableStorage), [aReS, aresState, availableStorage]);

  const refreshToken = useCallback(() => aReS?.contextSettings?.auth?.refreshToken(aresState, dispatch, availableStorage), [aReS, aresState, availableStorage]);

  const validateToken = useCallback(() => aReS?.contextSettings?.auth?.validateToken(aresState, dispatch, availableStorage, refreshToken), [aReS, aresState, availableStorage, refreshToken]);

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


