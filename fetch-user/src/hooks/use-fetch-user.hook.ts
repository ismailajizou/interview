import useFetch from "./use-fetch.hook";

type TUser = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const useFetchUser = (id: string) => {
  return useFetch<{ user: TUser }>("/api/users/" + id);
};

export const useFetchAllUsers = () => {
  return useFetch<{ users: TUser[] }>("/api/users");
};
