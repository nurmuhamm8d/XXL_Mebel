"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Box, Typography, Stack } from "@mui/material";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { ProductList } from "@/components/ProductList";
import { SearchFilter } from "@/components/SearchFilter";
import { ColorModeToggle } from "@/components/ColorModeToggle";

export default function Home() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const visibleProducts = useMemo(() => {
    let list = products;

    if (selectedCategory) {
      list = list.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((product) =>
        product.title.toLowerCase().includes(q)
      );
    }

    return list;
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return visibleProducts.slice(start, start + pageSize);
  }, [visibleProducts, page, pageSize]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h3" fontWeight={700}>
            XXL Мебель
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Каталог мебели с поиском, фильтрами и красивым интерфейсом.
          </Typography>
        </Box>
        <ColorModeToggle />
      </Stack>

      <SearchFilter
        categories={categories}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
      />

      <ProductList
        products={paginatedProducts}
        isLoading={isLoading}
        total={visibleProducts.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </Container>
  );
}
