import { useQuery } from '@tanstack/react-query';

interface FetchData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Fetch failed');
  return response.json();
};

const useFetch = <T>(url: string): FetchData<T> => {
  const { data, error, isLoading } = useQuery<T, Error>(
    ['fetchData', url],
    () => fetcher(url)
  );

  return {
    data: data || null,
    loading: isLoading,
    error,
  };
};

export default useFetch;
