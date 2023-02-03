import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';
import {
  existingContactAction,
  newContactAction,
} from './api/endpoints/contacts/actions';
import {
  contactDetailsLoader,
  contactListLoader,
} from './api/endpoints/contacts/loaders';
import Layout from './layout/Layout';
import ContactDetails from './pages/ContactDetails';
import Error from './pages/Error';
import Home from './pages/Home';
import NewContact from './pages/NewContact';

const router = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />,
          loader: contactListLoader(queryClient),
        },
        {
          path: 'contacts/:id',
          element: <ContactDetails />,
          loader: contactDetailsLoader(queryClient),
          action: existingContactAction(queryClient),
        },
        {
          path: 'contacts/new',
          element: <NewContact />,
          action: newContactAction(queryClient),
        },
      ],
    },
  ]);

export default router;
