"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import {
  fetchProducts,
  fetchCategories,
  fetchProductById,
} from "@/utils/api";

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(id: number) {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: Number.isFinite(id),
  });
}

export function useCategories() {
  return useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
