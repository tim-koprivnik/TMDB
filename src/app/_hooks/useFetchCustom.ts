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
  const initialLoadRef = useRef<null | boolean>(null);
  const abortController = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          initialLoadRef.current === null ||
          initialLoadRef.current === true
        ) {
          initialLoadRef.current = false;
          abortController.current.abort();
          abortController.current = new AbortController();
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Fetch failed');
          }
          const jsonData = await response.json();
          setData(jsonData);
          initialLoadRef.current = true;
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          if (
            err.name === 'AbortError' &&
            !abortController.current.signal.aborted
          ) {
            console.log('Fetch aborted');
          } else {
            setError(err);
            setLoading(false);
          }
        } else {
          throw err;
        }
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    return () => {
      abortController.current.abort();
    };
  }, []);

  return { data, loading, error };
};

export default useFetch;
