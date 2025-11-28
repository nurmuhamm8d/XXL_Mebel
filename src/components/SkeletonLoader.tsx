"use client";

import { Box, Skeleton } from "@mui/material";

export interface SkeletonLoaderProps {
  items: number;
}

export function SkeletonLoader({ items }: SkeletonLoaderProps) {
  return (
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
      {Array.from({ length: items }).map((_, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.paper",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton variant="rectangular" height={180} />
          <Box sx={{ p: 2 }}>
            <Skeleton width="60%" />
            <Skeleton width="40%" />
            <Skeleton width="80%" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
