import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a new QueryClient for react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // for demonstration purposes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router(queryClient)} />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}

export default App;
