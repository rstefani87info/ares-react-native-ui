import {useEffect, useMemo, useState} from 'react';
import axios from 'axios';

function normalizeMethod(value) {
  const raw = value === undefined || value === null ? '' : String(value);
  const normalized = raw.trim().toLowerCase();
  if (!normalized) {
    return 'get';
  }
  if (normalized === 'del') {
    return 'delete';
  }
  return normalized;
}

export function useQuery(url, onload = (x, e) => x, headers = {}, params = {}, method = 'GET') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizedMethod = useMemo(() => {
    return normalizeMethod(method);
  }, [method]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await axios({
          url,
          method: normalizedMethod,
          headers,
          params,
          signal: controller.signal,
        });

        const mapped = onload(response.data, null);
        setData(mapped);
      } catch (err) {
        if (axios.isCancel?.(err) || err?.name === 'CanceledError') {
          return;
        }
        if (err?.name === 'AbortError') {
          return;
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, normalizedMethod, headers, params, onload]);

  return {data, loading, error};
}

export {useQuery as query};
