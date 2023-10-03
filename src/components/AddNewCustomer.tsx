import { Button } from '@patternfly/react-core';
import React, { useState } from 'react';

function YourComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({

    name: '',
    age: '',
    IsCool: '',
  });
  const addNewCustomer = async (customerData) => {
    try {
      const response = await CustomerApi.addCustomer(customerData);
      console.log('Customer added:', response);


      setIsModalOpen(false);
      setNewCustomer({
        name: '',
        age: '',
        IsCool: '',
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };
  <Button onClick={() => setIsModalOpen(true)} variant='secondary'>
    Add New Customer
  </Button>

  {
    isModalOpen && (
      <Modal
        addNewCustomer={addNewCustomer}
        newCustomer={newCustomer}
        onClose={() => setIsModalOpen(false)}
      />
    )
  }
</div >
);
}

export default AddNewCustomer;
