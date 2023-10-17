import { Key, ReactNode } from 'react';
import { callAPI } from './apiUtilities';

export const choosableColors = ['red', 'pink', 'rebeccapurple', 'grey'];

export type Color = typeof choosableColors[number];

export interface Customer {
  id: Key | null | undefined;
  email: ReactNode;
  name: string;
  color: Color; 
  age: number;
  isCool: boolean;
}

export type Customers = Array<Customer>;

// Local storage "DAO layer" Getter/Setters
export const customersSetter = (customers: Customers | undefined) => {
  localStorage.setItem('customers', JSON.stringify(customers));
  return customers;
};

export const customersGetter = (): Customers => {
  const customers = localStorage.getItem('customers');
  if (customers) return [...JSON.parse(customers)];
  return [];
};

export const addNewCustomer = (customer: Customer) => {
  const customers = customersGetter();
  customers.push(customer);
  return customersSetter(customers);
};


export const deleteCustomer = (customerId: Key) => {
  const customers = customersGetter();
  const index = customers.findIndex((customer) => customer.id === customerId);

  if (index !== -1) {
    customers.splice(index, 1);
    customersSetter(customers);
  }
};

// Super real API calls
export const getCustomers = () => callAPI(customersGetter);

export const postCustomers = (customers: Array<Customer> | undefined) => () =>
  callAPI(() => customersSetter(customers));

export const postNewCustomer = (customer: Customer) => callAPI(() => addNewCustomer(customer));
