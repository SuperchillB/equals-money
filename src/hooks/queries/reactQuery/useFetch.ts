import { useQuery } from '@tanstack/react-query';
import { QueryKeyT, UseFetchProps } from '../../../_types/api';

/**
 * Peforms a GET request and returns a React Query context object
 * @param data            {Object}
 * @param data.queryKey   {String}          Query key
 * @param data.queryFn    {Function}        Function that will perform the GET request
 * @param data.config     {Object}          React Query config (eg: staleTime, refetchOnMount, ...)
 * @returns               {UseQueryResult}  React Query context object (contains 'isLoading', 'isError', ...)
 */
export const useFetch = <T>({
  queryKey,
  queryFn,
  config,
}: UseFetchProps<T>) => {
  const query = useQuery<T, Error, T, QueryKeyT>(queryKey, () => queryFn(), {
    enabled: !!queryKey,
    ...config,
  });

  return query;
};
