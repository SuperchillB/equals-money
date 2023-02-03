import { contactListQuery } from '../../../api/endpoints/contacts/queries';
import { ContactDTO } from '../../../_types/api/contacts/Contact';
import { useFetch } from '../reactQuery/useFetch';

const useGetContacts = (initialData?: ContactDTO[]) =>
  useFetch({
    ...contactListQuery,
    config: {
      refetchOnMount: true,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      initialData,
    },
  });

export default useGetContacts;
