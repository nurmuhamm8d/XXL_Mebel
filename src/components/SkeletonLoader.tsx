"use client";

import { Grid, Skeleton } from "@mui/material";

export interface SkeletonLoaderProps {
  items: number;
}

export function SkeletonLoader({ items }: SkeletonLoaderProps) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: items }).map((_, index) => (
        <Grid
          key={index}
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <Skeleton
            variant="rectangular"
            height={160}
            sx={{ borderRadius: 2, mb: 2 }}
          />
          <Skeleton width="70%" />
          <Skeleton width="40%" />
        </Grid>
      ))}
    </Grid>
  );
}
