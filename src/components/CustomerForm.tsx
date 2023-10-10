import React, { useState, FormEvent } from 'react';
import { useQuery, useQueryClient } from 'react-query';


interface Customer {

  isCool: boolean;
}
.
async function getCustomers() {
  getCustomers
}

async function addNewCustomer(customer: Customer) {
  addNewCustomer
}

interface CustomerFormProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ setIsModalOpen }) => {
  const [newUser, setNewUser] = useState<Partial<Customer>>({ isCool: false });
  const queryClient = useQueryClient();

  // Queries
  const { isLoading, data } = useQuery('customers', getCustomers);

  const onSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    addNewCustomer(newUser as Customer);
    setNewUser({ isCool: false });
    setIsModalOpen(false);
    queryClient.invalidateQueries('customers');
  };

}
export default CustomerForm;
