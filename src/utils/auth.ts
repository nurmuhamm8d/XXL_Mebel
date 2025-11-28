import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterPayload = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/auth/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function register(
  payload: RegisterPayload
): Promise<LoginResponse> {
  const userBody = {
    email: payload.email,
    username: payload.username,
    password: payload.password,
    name: {
      firstname: payload.firstName,
      lastname: payload.lastName,
    },
  };

  await axios.post(`${API_BASE_URL}/users`, userBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const loginResponse = await login({
    username: payload.username,
    password: payload.password,
  });

  return loginResponse;
}
