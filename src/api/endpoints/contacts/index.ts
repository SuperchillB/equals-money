import { contactsBaseQueryKey } from '../../../constants/api/sharedQueryKeys';
import {
  ContactDTO,
  ContactDTOBase,
} from '../../../_types/api/contacts/Contact';
import request from '../../request';

const contactsEndpoints = {
  getContacts: async (): Promise<ContactDTO[]> =>
    request({
      path: `/${contactsBaseQueryKey}`,
    }),
  getContact: async (id: string): Promise<ContactDTO> =>
    request({
      path: `/${contactsBaseQueryKey}/${id}`,
    }),
  updateContact: async (id: string, changes: ContactDTOBase) =>
    request({
      path: `/${contactsBaseQueryKey}/${id}`,
      args: {
        method: 'PUT',
        body: JSON.stringify(changes),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }),
  deleteContact: async (id: string) =>
    request({
      path: `/${contactsBaseQueryKey}/${id}`,
      args: {
        method: 'DELETE',
      },
    }),
  createContact: async (data: ContactDTOBase) =>
    request({
      path: `/${contactsBaseQueryKey}`,
      args: {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }),
};

export default contactsEndpoints;
