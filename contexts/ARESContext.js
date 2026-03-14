import React, { createContext, useReducer, useEffect } from 'react';
import * as crypto from '@ares/core/crypto';
import DeviceInfo from 'react-native-device-info';
import { config } from '../config';

export const aReSContext = createContext();

const initialState = {
    datasourceMap: {},
    loading: true,
    error: null,
    get aReS() { return config.ares; }
};

function ARESReducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATASOURCES':
            return {
                ...state,
                datasourceMap: action.payload || {},
                loading: false,
                error: null,
                aReS: config.ares
            };
        case 'SET_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
                aReS: config.ares
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
            console.error("ARES instance not configured in @ares/react-native-ui");
            return;
        }
        try {
            await aReS.initAllDatasources(aReS.datasourceListToBeInstalled);
            dispatch({ type: 'FETCH_DATASOURCES', payload: aReS.datasourceMap });
        } catch (error) {
            aReS.console.error('ARESProvider fetchDatasources error:', error , error.getStackTrace());
            dispatch({ type: 'SET_ERROR', payload: error?.message ?? 'Unknown error' });
        }
    };

    useEffect(() => {
        fetchDatasources();
        const getSessionID = async () => global.sessionID = crypto.getUniqueId(await DeviceInfo.getUniqueId());
        getSessionID();
    }, []);

    return (
        <aReSContext.Provider value={{ state, dispatch, fetchDatasources }}>
            {children}
        </aReSContext.Provider>
    );
}
