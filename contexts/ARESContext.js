import React, { createContext, useReducer, useEffect } from 'react';
import aReS from '../ares.js';
import * as place4partyDS from '../datasources/place4party/datasource';

const datasourceList = [place4partyDS];

export const ARESContext = createContext();

const initialState = {
    datasourceMap: {},
    loading: true,
    error: null,
    aReS
};

function ARESReducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATASOURCES':
            return {
                ...state,
                datasourceMap: action.payload || {},
                loading: false,
                error: null,
                aReS
            };
        case 'SET_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
                aReS
            };
        default:
            return state;
    }
}

export const ARESProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ARESReducer, initialState);

    const fetchDatasources = async () => {
        try {
            await aReS.initAllDatasources(datasourceList);
            dispatch({ type: 'FETCH_DATASOURCES', payload: aReS.datasourceMap });
        } catch (error) {
            console.error('ARESProvider.fetchDatasources error:', error);
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    useEffect(() => {
        fetchDatasources();
    }, []);

    return (
        <ARESContext.Provider value={{ state, dispatch, fetchDatasources }}>
            {children}
        </ARESContext.Provider>
    );
};
