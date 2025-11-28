"use client";

import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
  Rating,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = Number(params.id);
  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 6, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h6" gutterBottom>
          Товар не найден
        </Typography>
        <Button variant="outlined" onClick={() => router.push("/")}>
          Вернуться в каталог
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button variant="text" onClick={() => router.back()} sx={{ mb: 3 }}>
        Назад к каталогу
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: { xs: "stretch", md: "flex-start" },
          animation: "fadeInUp 0.4s ease forwards",
          opacity: 0,
        }}
      >
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "0 0 40%" },
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.14)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: "100%",
              maxWidth: 360,
              height: { xs: 260, md: 320 },
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Chip
            label={product.category}
            sx={{ alignSelf: "flex-start", textTransform: "capitalize" }}
          />
          <Typography variant="h4" fontWeight={700}>
            {product.title}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h4" color="primary" fontWeight={700}>
              ${product.price.toFixed(2)}
            </Typography>
            {product.rating && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating
                  value={product.rating.rate}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {product.rating.rate.toFixed(1)} • {product.rating.count} отзывов
                </Typography>
              </Stack>
            )}
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" size="large">
              Добавить в избранное
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
