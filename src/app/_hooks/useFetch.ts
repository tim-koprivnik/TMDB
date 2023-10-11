import { useQuery } from '@tanstack/react-query';

interface FetchData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fetch failed');
    return response.json();
  } catch (error) {
    throw error;
  }
};

const useFetch = <T>(
  url: string,
  cacheKey: string = 'fetchData'
): FetchData<T> => {
  const { data, error, isLoading } = useQuery<T, Error>(
    [cacheKey, url],
    () => fetcher(url),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    data: data || null,
    loading: isLoading,
    error,
  };
};

export default useFetch;
