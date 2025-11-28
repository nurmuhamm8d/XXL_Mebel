"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { createUser } from "@/utils/api";
import { NewUserPayload } from "@/types";
import { LOCAL_USERS_STORAGE_KEY } from "@/config/auth";
import { useAuth } from "@/contexts/AuthContext";

type LocalUser = {
  username: string;
  password: string;
};

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    if (!username.trim() || !email.trim() || !password) {
      setError("Заполни все обязательные поля.");
      return;
    }

    if (password !== passwordRepeat) {
      setError("Пароли не совпадают.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload: NewUserPayload = {
        email: email.trim(),
        username: username.trim(),
        password,
        name: {
          firstname: firstName.trim() || "User",
          lastname: lastName.trim() || "User",
        },
        address: {
          city: "Unknown",
          street: "Unknown",
          number: 0,
          zipcode: "00000",
        },
        phone: "0000000000",
      };

      try {
        await createUser(payload);
      } catch {}

      if (typeof window !== "undefined") {
        const raw = window.localStorage.getItem(LOCAL_USERS_STORAGE_KEY);
        let users: LocalUser[] = [];

        if (raw) {
          try {
            users = JSON.parse(raw) as LocalUser[];
          } catch {
            users = [];
          }
        }

        const exists = users.some((u) => u.username === payload.username);
        if (exists) {
          setError("Пользователь с таким логином уже существует.");
          setSubmitting(false);
          return;
        }

        users.push({ username: payload.username, password: payload.password });
        window.localStorage.setItem(
          LOCAL_USERS_STORAGE_KEY,
          JSON.stringify(users)
        );
      }

      await login({ username: username.trim(), password });
      router.push("/");
    } catch {
      setError("Не удалось создать аккаунт. Попробуй ещё раз.");
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 4,
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          bgcolor: theme.palette.mode === "dark" ? "#242424" : "#ffffff",
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={1}>
          Регистрация
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Создай аккаунт, чтобы управлять каталогом мебели.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Логин"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Имя"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Фамилия"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>

            <TextField
              label="E-mail"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Пароль"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Повтори пароль"
              type="password"
              fullWidth
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={submitting}
              sx={{ mt: 1 }}
            >
              Зарегистрироваться
            </Button>
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
        >
          <Typography variant="body2" color="text.secondary">
            Уже есть аккаунт?
          </Typography>
          <MuiLink component={NextLink} href="/auth/login" underline="none">
            Войти
          </MuiLink>
        </Stack>
      </Box>
    </Container>
  );
}
