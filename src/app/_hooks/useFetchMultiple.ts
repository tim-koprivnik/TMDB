'use client';

import { useState, useEffect, useRef } from 'react';

interface FetchDataMultiple<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetchMultiple = <T>(
  urls: string[],
  dependencies: Array<string | number | boolean> = []
): FetchDataMultiple<T[]> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllers = useRef<AbortController[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      abortControllers.current.forEach(controller => controller.abort());
      abortControllers.current = urls.map(() => new AbortController());

      try {
        const allResponses = await Promise.all(
          urls.map(async (url, index) => {
            const response = await fetch(url, {
              signal: abortControllers.current[index].signal,
            });
            if (!response.ok) {
              throw new Error('Fetch failed');
            }
            return response.json();
          })
        );

        setData(allResponses);
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
      abortControllers.current.forEach(controller => controller.abort());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify([...urls, ...dependencies])]);

  return { data, loading, error };
};

export default useFetchMultiple;
