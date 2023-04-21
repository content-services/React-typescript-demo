import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { customersGetter, customersSetter } from './api/CustomerApi';
import { initialCustomers } from './api/startingValues';
import ContainerWrapper from './components/ContainerWrapper';
import Landing from './pages/Landing';

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
