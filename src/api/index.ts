import contactsEndpoints from './endpoints/contacts';

// This object serves as an endpoint factory where we can
// store all our feature-based endpoints.

const apiClient = {
  contacts: contactsEndpoints,
  // ...
  // Other feature-based endpoints go here
};

export default apiClient;
