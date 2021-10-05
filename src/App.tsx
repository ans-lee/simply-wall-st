import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import StocksPage from '../src/pages/StocksPage';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <StocksPage />
  </QueryClientProvider>
);

export default App;
