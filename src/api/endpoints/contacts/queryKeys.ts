import { QueryKeyT } from '../../../_types/api';

/*
Comments:
  - This file contains a factory of all the React Query keys needed
  for contact-related query operations. These keys are needed for
  cache-storing operations (performed by react-query).
  - A factory is a better approach for query keys as it's less
  error-prone and easier to maintain. It allows us to separate our
  keys by different levels of specificity. For example, 'list' being
  the base level for all our 'contacts' related queries, we can
  invalidate all our contacts at once. However, we can also choose to
  invalidate only a particular contact, and leave the rest untouched.
*/
const contactKeys = {
  list: ['contacts'] as const,
  details: (id: string) => [...contactKeys.list, 'details', id] as QueryKeyT,
};

export default contactKeys;
