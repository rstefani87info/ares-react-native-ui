export const fetchDataRequest = (fetchFunction, organizeFunction, key, refreshRate) => ({
    type: 'FETCH_DATA_REQUEST',
    fetchFunction,
    organizeFunction,
    key,
    refreshRate
  });
  
  export const fetchDataSuccess = (key, data) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: { key, data }
  });
  
  export const fetchDataFailure = (error) => ({
    type: 'FETCH_DATA_FAILURE',
    error
  });