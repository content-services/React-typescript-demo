import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { customersGetter, customersSetter } from './api/CustomerApi';
import { initialCustomers } from './api/startingValues';
import ContainerWrapper from './components/ContainerWrapper';
import Landing from './pages/Landing';
import { QueryClient, QueryClientProvider, useQueryClient, useMutation } from 'react-query';
import App from './App';
import ReactDOM from 'react-dom';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);

const addNewCustomer = async (customerData: any) => {
  const response = await fetch('/api/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add customer');
  }

  return response.json();
};
const { mutate } = useMutation(addNewCustomer, {
  onSuccess: () => {

    queryClient.invalidateQueries('customers');
  },
});

export default () => {
  useEffect(() => {
    // This just goes and gets/sets initial data
    const customers = customersGetter();
    if (customers.length === 0) {
      customersSetter(initialCustomers);
    }
  }, []);

  return (
    <ContainerWrapper>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<Navigate to='/' />} />
        {/* ^^ this is the new <Redirect/> for V6 of react router */}
      </Routes>
    </ContainerWrapper>
  );
};
