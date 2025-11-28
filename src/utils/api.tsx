import axios from "axios";
import { Product } from "@/types";

const API_BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
  return response.data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
  return response.data;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await axios.get<string[]>(
    `${API_BASE_URL}/products/categories`
  );
  return response.data;
}
