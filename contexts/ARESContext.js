import React, { createContext, useReducer, useEffect } from 'react';
import aReS from '../../../../ares';

export const aReSContext = createContext();

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
            await aReS.initAllDatasources(aReS.datasourceListToBeInstalled);
            dispatch({ type: 'FETCH_DATASOURCES', payload: aReS.datasourceMap });
        } catch (error) {
            aReS.console.error('ARESProvider fetchDatasources error:', error , error.getStackTrace());
            dispatch({ type: 'SET_ERROR', payload: error?.message ?? 'Unknown error' });
        }
    };

    useEffect(() => {
        fetchDatasources();
    }, []);

    return (
        <aReSContext.Provider value={{ state, dispatch, fetchDatasources }}>
            {children}
        </aReSContext.Provider>
    );
};
