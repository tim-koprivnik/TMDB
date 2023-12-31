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
        const allRes = await Promise.all(
          urls.map(async (url, index) => {
            const res = await fetch(url, {
              signal: abortControllers.current[index].signal,
            });
            if (!res.ok) {
              throw new Error('Fetch failed');
            }
            return res.json();
          })
        );

        setData(allRes);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError(new Error('Fetch aborted'));
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
