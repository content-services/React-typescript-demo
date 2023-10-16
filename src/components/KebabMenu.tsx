import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customersGetter, postCustomers } from 'src/api/CustomerApi';

const CustomerTable = () => {
  const queryClient = useQueryClient();
  const customersQuery = useQuery('customers', customersGetter);

  const deleteCustomerMutation = useMutation(postCustomers, {
    onSettled: () => {
      queryClient.invalidateQueries('customers');
    },
  });

  const handleDeleteCustomer = (customerId) => {
    deleteCustomerMutation.mutate(customersQuery.data, {
      onSuccess: () => {
        // Handle success (optional)
      },
      onError: (error) => {
        // Handle error (optional)
      },
    });
  };

  return (
    <div>
      {customersQuery.isLoading ? (
        <div>Loading...</div>
      ) : customersQuery.isError ? (
        <div>Error: {customersQuery.error.message}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Is Cool</th>
            </tr>
          </thead>
          <tbody>
            {customersQuery.data.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <div className="kebab-menu">
                    <div className="kebab-menu-content">
                      <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerTable;
