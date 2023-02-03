import apiClient from '../..';
import contactKeys from './queryKeys';

/*
  Here we list all the queries used for react-query.
  Each query is a combination of a key and an async function
*/

export const contactListQuery = {
  queryKey: contactKeys.list,
  queryFn: apiClient.contacts.getContacts,
};

export const contactDetailsQuery = (id: string) => ({
  queryKey: contactKeys.details(id),
  queryFn: async () => apiClient.contacts.getContact(id),
});
