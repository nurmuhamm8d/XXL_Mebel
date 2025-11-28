"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import {
  useProduct,
  useCategories,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hooks/useProducts";
import {
  ProductFormDialog,
  ProductFormValues,
} from "@/components/ProductFormDialog";
import { DeleteProductDialog } from "@/components/DeleteProductDialog";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productId = Number(params.id);

  const { data: product, isLoading, isError } = useProduct(productId);
  const { data: categories = [] } = useCategories();

  const { mutateAsync: updateProductMutation, isPending: isUpdating } =
    useUpdateProduct();
  const { mutateAsync: deleteProductMutation, isPending: isDeleting } =
    useDeleteProduct();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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

  const handleEditSubmit = async (values: ProductFormValues) => {
    const price =
      values.price !== undefined && values.price !== null && values.price !== ""
        ? Number(values.price)
        : product.price;

    let image = values.imageUrl?.trim() || product.image;
    if (!values.imageUrl && values.imageFile) {
      image = URL.createObjectURL(values.imageFile);
    }

    await updateProductMutation({
      id: productId,
      data: {
        title: values.title || product.title,
        price,
        description: values.description || product.description,
        category: values.category || product.category,
        image,
      },
    });

    setEditOpen(false);
  };

  const handleDeleteConfirm = async () => {
    await deleteProductMutation(productId);
    setDeleteOpen(false);
    router.push("/");
  };

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
                  {product.rating.rate.toFixed(1)} • {product.rating.count}{" "}
                  отзывов
                </Typography>
              </Stack>
            )}
          </Stack>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" size="large">
              Добавить в избранное
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setEditOpen(true)}
              disabled={isUpdating || isDeleting}
            >
              Редактировать
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => setDeleteOpen(true)}
              disabled={isDeleting}
            >
              Удалить
            </Button>
          </Stack>
        </Box>
      </Box>

      <ProductFormDialog
        open={editOpen}
        mode="edit"
        initialProduct={product}
        categories={categories}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
      />

      <DeleteProductDialog
        open={deleteOpen}
        title={product.title}
        loading={isDeleting}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}
