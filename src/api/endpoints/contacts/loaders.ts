import { QueryClient } from '@tanstack/react-query';
import { Params } from 'react-router-dom';
import { contactDetailsQuery, contactListQuery } from './queries';

export const contactListLoader = (queryClient: QueryClient) => async () => {
  // First check if data is available in react-query cache
  // If so, return the cached data
  // If not, fetch the data
  return await queryClient.ensureQueryData(contactListQuery);
};

export const contactDetailsLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Readonly<Params<string>> }) => {
    const query = contactDetailsQuery(params.id as string);

    // First check if data is available in react-query cache
    // If so, return the cached data
    // If not, fetch the data
    return await queryClient.ensureQueryData(query);
  };
