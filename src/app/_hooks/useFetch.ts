'use client';

import { useState, useEffect, useRef } from 'react';

interface FetchData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(url: string): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        abortController.current.abort();
        abortController.current = new AbortController();
        const res = await fetch(url, {
          signal: abortController.current.signal,
        });

        if (!res.ok) {
          throw new Error('Fetch failed');
        }

        const resData: T = await res.json();
        setData(resData);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.error('Fetch aborted');
          } else {
            setError(err);
          }
        }
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.current.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
