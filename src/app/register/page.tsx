"use client";

import { FormEvent, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    Link as MuiLink,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await registerUser({
        email,
        username,
        password,
        firstName,
        lastName,
      });
      await login({ username, password });
      router.replace("/");
    } catch {
      setError("Не удалось зарегистрироваться. Попробуй ещё раз.");
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
          boxShadow: 12,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Регистрация
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Создай аккаунт, чтобы управлять каталогом XXL Мебель.
        </Typography>

        {error && (
          <Alert severity="error" variant="outlined">
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Stack>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Зарегистрироваться
            </Button>
          </Stack>
        </Box>

        <Stack direction="row" justifyContent="center" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Уже есть аккаунт?
          </Typography>
          <MuiLink component={Link} href="/login" variant="body2">
            Войти
          </MuiLink>
        </Stack>
      </Box>
    </Container>
  );
}
