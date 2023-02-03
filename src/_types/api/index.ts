import { UseQueryOptions } from '@tanstack/react-query';

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface APIRequestParams {
  baseUrl?: string;
  path: string;
  args?: {
    method: HTTPMethods;
    headers?: { [key in string]: string };
    body?: any;
  };
}

/**
 * Query key factory (react-query)
 */
export type QueryKeyT = readonly [
  string,
  ...(string | object | number | undefined)[],
];

/**
 * Used for our useFetch hook, which fetches data using react-query's 'useQuery'
 */
export interface UseFetchProps<T> {
  queryKey: QueryKeyT;
  queryFn: () => Promise<T>;
  config?: UseQueryOptions<T, Error, T, QueryKeyT>;
}
