'use client';

import { useState, useEffect, useRef } from 'react';

interface FetchDataMultiple<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetchMultiple = <T>(
  urls: string[],
  dependencies: Array<string | number | boolean> = [],
  delay = 0
): FetchDataMultiple<T[]> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllers = useRef<AbortController[]>([]);
  const timer = useRef<number | null>(null);

  const dependencyString = JSON.stringify([...urls, ...dependencies, delay]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (timer.current !== null) {
      clearTimeout(timer.current);
    }

    timer.current = window.setTimeout(async () => {
      try {
        abortControllers.current.forEach(controller => controller.abort());
        abortControllers.current = urls.map(() => new AbortController());

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
      abortControllers.current.forEach(controller => controller.abort());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyString]);

  return { data, loading, error };
};

export default useFetchMultiple;
