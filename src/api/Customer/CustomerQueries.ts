import { useMutation, useQuery } from "react-query";

import { ApiQueryOptions, ApiUseMutationOptions } from "./../queryHelpers";
import { Customer, Customers, getCustomers, postNewCustomer } from "./CustomerApi";

export const getCustomerQuery = (options?: ApiQueryOptions<Customers>) => useQuery<Customers>(
  "customers",
  getCustomers,
  options
);

// postNewCustomer 
export const postNewCustomerMutation =
  (customer: Customer, options: ApiUseMutationOptions<Customers>) =>
    useMutation(() => postNewCustomer(customer), options);
