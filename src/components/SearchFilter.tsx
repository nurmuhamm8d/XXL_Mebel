"use client";

import { Box, TextField, MenuItem, Paper } from "@mui/material";

interface SearchFilterProps {
  categories: string[];
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function SearchFilter({
  categories,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        mb: 3,
        p: 2.5,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: { xs: "stretch", sm: "center" },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <TextField
          fullWidth
          label="Поиск по названию"
          variant="outlined"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </Box>
      <Box sx={{ width: { xs: "100%", sm: 260 } }}>
        <TextField
          select
          fullWidth
          label="Категория"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <MenuItem value="">Все категории</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Paper>
  );
}
