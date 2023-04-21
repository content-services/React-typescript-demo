import './index.css';
import '@patternfly/react-core/dist/styles/base.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AppContextProvider } from './middleware';

const queryClient = new QueryClient();

render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root'),
);
