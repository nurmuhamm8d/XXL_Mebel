import axios from "axios";
import {
  Product,
  NewProductPayload,
  UpdateProductPayload,
  AuthCredentials,
  AuthResponse,
  RegisterPayload,
  User,
  NewUserPayload,
  UpdateUserPayload,
} from "@/types";

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

export async function createProduct(
  payload: NewProductPayload
): Promise<Product> {
  const response = await axios.post<Product>(
    `${API_BASE_URL}/products`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updateProduct(
  id: number,
  payload: UpdateProductPayload
): Promise<Product> {
  const response = await axios.put<Product>(
    `${API_BASE_URL}/products/${id}`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteProduct(id: number): Promise<Product> {
  const response = await axios.delete<Product>(
    `${API_BASE_URL}/products/${id}`
  );
  return response.data;
}

export async function login(
  credentials: AuthCredentials
): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/login`,
    credentials,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<User> {
  const requestBody = {
    email: payload.email,
    username: payload.username,
    password: payload.password,
    name: {
      firstname: payload.firstName,
      lastname: payload.lastName,
    },
  };

  const response = await axios.post<User>(`${API_BASE_URL}/users`, requestBody, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
  return response.data;
}

export async function fetchUserById(id: number): Promise<User> {
  const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
  return response.data;
}

export async function createUser(payload: NewUserPayload): Promise<User> {
  const response = await axios.post<User>(`${API_BASE_URL}/users`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function updateUser(
  id: number,
  payload: UpdateUserPayload
): Promise<User> {
  const response = await axios.put<User>(
    `${API_BASE_URL}/users/${id}`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteUser(id: number): Promise<User> {
  const response = await axios.delete<User>(`${API_BASE_URL}/users/${id}`);
  return response.data;
}
