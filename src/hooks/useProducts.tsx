import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/utils/api";
import { Product, NewProductPayload, UpdateProductPayload } from "@/types";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
};

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, NewProductPayload>({
    mutationFn: createProduct,
    onSuccess: (created) => {
      queryClient.setQueryData<Product[]>(["products"], (old) => {
        if (!old) {
          return [created];
        }
        return [created, ...old];
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Product,
    Error,
    { id: number; data: UpdateProductPayload }
  >({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<Product[]>(["products"], (old) => {
        if (!old) {
          return old;
        }
        return old.map((p) => (p.id === updated.id ? { ...p, ...updated } : p));
      });

      queryClient.setQueryData<Product>(["product", updated.id], (old) => {
        if (!old) {
          return updated;
        }
        return { ...old, ...updated };
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, number>({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Product[]>(["products"], (old) => {
        if (!old) {
          return old;
        }
        return old.filter((p) => p.id !== id);
      });
      queryClient.removeQueries({ queryKey: ["product", id] });
    },
  });
};
