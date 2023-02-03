import { contactDetailsQuery } from '../../../api/endpoints/contacts/queries';
import { ContactDTO } from '../../../_types/api/contacts/Contact';
import { useFetch } from '../reactQuery/useFetch';

const useGetContact = (id: string, initialData?: ContactDTO) =>
  useFetch({
    ...contactDetailsQuery(id),
    config: {
      refetchOnMount: true,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  });

export default useGetContact;
