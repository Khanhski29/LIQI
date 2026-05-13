import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterCustom from './router';
import { BrowserRouter } from 'react-router-dom';
import './style/style.scss';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RouterCustom />
    </BrowserRouter>

  </QueryClientProvider>
);

