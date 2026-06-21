import { createContext, useReducer, useEffect } from 'react';
import * as crypto from '@ares/core/crypto';
import DeviceInfo from 'react-native-device-info';
import { config } from '../config';

const initialState = {
    datasourceMap: {},
    loading: true,
    error: null,
    sessionId: null,
    get aReS() { return config.ares; },
};

export const aReSContext = createContext({ state: initialState, dispatch: () => {}, fetchDatasources: async () => {} });

function ARESReducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATASOURCES':
            return {
                ...state,
                datasourceMap: action.payload || {},
                loading: false,
                error: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'SET_SESSION_ID':
            return {
                ...state,
                sessionId: action.payload || null,
            };
        default:
            return state;
    }
}

export function ARESProvider  ({ children }) {
    const [state, dispatch] = useReducer(ARESReducer, initialState);

    const fetchDatasources = async () => {
        const aReS = config.ares;
        if (!aReS) {
            const message = 'ARES instance not configured in @ares/react-native-ui. Call setConfig({ ares }) before rendering.';
            config.logger?.error?.(message);
            dispatch({ type: 'SET_ERROR', payload: message });
            return;
        }
        try {
            await aReS.initAllDatasources(aReS.datasourceListToBeInstalled);
            dispatch({ type: 'FETCH_DATASOURCES', payload: aReS.datasourceMap });
        } catch (error) {
            config.logger?.error?.('ARESProvider fetchDatasources error:', error);
            dispatch({ type: 'SET_ERROR', payload: error?.message ?? 'Unknown error' });
        }
    };

    useEffect(() => {
        fetchDatasources();
        const setSessionID = async () => {
            try {
                const sessionId = crypto.getUniqueId(await DeviceInfo.getUniqueId());
                dispatch({ type: 'SET_SESSION_ID', payload: sessionId });
            } catch (error) {
                config.logger?.error?.('ARESProvider sessionId error:', error);
            }
        };
        setSessionID();
    }, []);

    return (
        <aReSContext.Provider value={{ state, dispatch, fetchDatasources }}>
            {children}
        </aReSContext.Provider>
    );
}
