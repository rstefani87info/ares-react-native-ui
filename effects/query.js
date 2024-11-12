import { useState, useEffect } from 'react';
import { toQueryString ,normalizeMethodsArray } from '@ares/web/http';
import axios from 'axios';
export function query( url, onload = (x,e)=>x, headers = {}, params = {}, method = 'GET' ) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const normalizedMethods =  normalizeMethodsArray([method]);
        const normalizedMethod =  normalizedMethods.pop();
        const fetchData = async () => {
          try {
            setLoading(true);
            if(normalizedMethod==="get"){
              url+="?" + toQueryString(params);
            }
            const response =  axios({ url, headers, params, normalizedMethod }).then(onload);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [url]);
    
      return { data, loading, error };
}