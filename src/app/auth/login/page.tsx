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
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await login({ username: username.trim(), password });
      router.push("/");
    } catch {
      setError("Не удалось войти. Проверь логин и пароль.");
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
          Вход
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Авторизуйся, чтобы управлять каталогом мебели.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Логин"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Пароль"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Войти
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
            Нет аккаунта?
          </Typography>
          <MuiLink component={NextLink} href="/auth/register" underline="none">
            Зарегистрироваться
          </MuiLink>
        </Stack>
      </Box>
    </Container>
  );
}
