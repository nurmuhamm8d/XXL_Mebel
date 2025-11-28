"use client";

import { Box, Container, Pagination, Typography, Fade } from "@mui/material";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { SkeletonLoader } from "./SkeletonLoader";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ProductList({
  products,
  isLoading,
  total,
  page,
  pageSize,
  onPageChange,
}: ProductListProps) {
  if (isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <SkeletonLoader items={pageSize} />
      </Container>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <Container sx={{ py: 8 }}>
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>
            Товары не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Попробуй изменить строку поиска или фильтры.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {products.map((product) => (
          <Fade in timeout={400} key={product.id}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ProductCard product={product} />
            </Box>
          </Fade>
        ))}
      </Box>

      {total > pageSize && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(total / pageSize)}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
}
