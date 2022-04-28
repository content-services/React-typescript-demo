import { QueryKey, UseMutationOptions, UseQueryOptions } from "react-query";

export type ApiQueryOptions<GenericType> =
  Omit<UseQueryOptions<GenericType, unknown, GenericType, QueryKey>, "queryKey" | "queryFn">

export type ApiUseMutationOptions<GenericType> =
  Omit<UseMutationOptions<GenericType, unknown, void, unknown>, "mutationFn"> 