import React from 'react';
import { useMutation } from 'react-query';

function MyComponent() {
  const [mutate] = useMutation(addNewCustomer);

  const handleAddNewCustomer = async () => {

    await mutate();
  };

  return (
    <Button
      onClick={handleAddNewCustomer}
      variant='secondary'
    >
      Add New Customer
    </Button>
  );
}

export default MyComponent;
