import { callAPI } from './apiUtilities';

export const choosableColors = ['red', 'pink', 'rebeccapurple', 'grey'];

export type Color = 'red' | 'pink' | 'rebeccapurple' | 'grey'

export interface Customer {
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

// Super real API calls
export const getCustomers = () => callAPI(customersGetter);

export const postCustomers = (customers: Array<Customer> | undefined) => () =>
  callAPI(() => customersSetter(customers));

export const postNewCustomer = (customer: Customer) => callAPI(() => addNewCustomer(customer));
