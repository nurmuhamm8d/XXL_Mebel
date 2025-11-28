export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export type NewProductPayload = Omit<Product, "id" | "rating">;

export type UpdateProductPayload = Partial<NewProductPayload>;

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserName {
  firstname: string;
  lastname: string;
}

export interface UserAddressGeolocation {
  lat: string;
  long: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation?: UserAddressGeolocation;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserName;
  address: UserAddress;
  phone: string;
}

export type NewUserPayload = Omit<User, "id">;

export type UpdateUserPayload = Partial<NewUserPayload>;

export interface ApiResponse {
  products: Product[];
  categories: string[];
}
