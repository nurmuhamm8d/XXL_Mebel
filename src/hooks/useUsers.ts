
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
} from "@/utils/api";
import { User, NewUserPayload, UpdateUserPayload } from "@/types";

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, NewUserPayload>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { id: number; data: UpdateUserPayload }>({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, number>({
    mutationFn: deleteUser,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};
