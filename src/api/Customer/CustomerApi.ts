import { callAPI } from "../apiUtilities";

export const choosableColors = ["red", "pink", "rebeccapurple", "grey"] as const;
export type Color = typeof choosableColors[number]

export interface Customer {
  name: string;
  color: Color;
  age: number;
  isCool: boolean;
}

export type Customers = Array<Customer>;

//Local storage "DAO layer" Getter/Setters
export const customersSetter = (customers: Customers) => {
  localStorage.setItem("customers", JSON.stringify(customers));
  return customers;
};

export const customersGetter = (): Customers => {
  const customers = localStorage.getItem("customers");
  if (customers) return [...JSON.parse(customers)];
  return [];
};

export const addNewCustomer = (customer: Customer) => {
  const customers = customersGetter();
  customers.push(customer);
  return customersSetter(customers);
};

//Super real API calls
export const getCustomers = () => callAPI(customersGetter);

export const postCustomers = (customers: Customers) => () =>
  callAPI<Customers>(() => customersSetter(customers));

export const postNewCustomer = (customer: Customer) =>
  callAPI<Customers>(() => addNewCustomer(customer), 0.9);

