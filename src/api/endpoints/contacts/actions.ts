import { QueryClient } from '@tanstack/react-query';
import { Params, redirect } from 'react-router-dom';
import apiClient from '../..';
import { contactsBaseQueryKey } from '../../../constants/api/sharedQueryKeys';
import { ContactChanges } from '../../../_types/api/contacts/Contact';
import contactKeys from './queryKeys';

type ExistingContactActionProps = {
  request: Request;
  params: Readonly<Params<string>>;
};

export const existingContactAction =
  (queryClient: QueryClient) =>
  async ({ request, params }: ExistingContactActionProps) => {
    const formData = await request.formData();
    const changes = Object.fromEntries(formData) as ContactChanges;
    const intent = formData.get('intent');
    const { id } = params;

    if (id && id.length > 0) {
      if (intent === 'update') {
        await apiClient.contacts.updateContact(id, changes);
      } else if (intent === 'delete') {
        await apiClient.contacts.deleteContact(id);
      }
    }

    /* Invalidating the cache for all contacts */
    queryClient.invalidateQueries({ queryKey: contactKeys.list });

    /* Redirect to contact details page if update, if delete redirect to homepage */
    if (intent === 'update') {
      return redirect(`/${contactsBaseQueryKey}/${params.id}`);
    }
    return redirect('/');
  };

export const newContactAction =
  (queryClient: QueryClient) =>
  async ({ request }: Omit<ExistingContactActionProps, 'params'>) => {
    const formData = await request.formData();
    const changes = Object.fromEntries(formData) as ContactChanges;

    await apiClient.contacts.createContact(changes);
    queryClient.invalidateQueries({ queryKey: contactKeys.list });

    return redirect('/');
  };
