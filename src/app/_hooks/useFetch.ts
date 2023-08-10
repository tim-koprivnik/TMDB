'use client';

import { useState, useEffect, useRef } from 'react';

interface FetchData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(url: string, delay = 0): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef(new AbortController());
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(async () => {
      try {
        abortController.current.abort();
        abortController.current = new AbortController();
        const response = await fetch(url, {
          signal: abortController.current.signal,
        });

        if (!response.ok) {
          throw new Error('Fetch failed');
        }

        const responseData: T = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            setError(err);
          }
        }
        setLoading(false);
      }
    }, delay) as unknown as number;

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
      abortController.current.abort();
    };
  }, [url, delay]);

  return { data, loading, error };
};

export default useFetch;
