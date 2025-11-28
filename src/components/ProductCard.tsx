"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating
} from "@mui/material";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      elevation={3}
      sx={{
        maxWidth: 310,
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6
        }
      }}
    >
      <CardActionArea
        component={Link}
        href={`/product/${product.id}`}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            bgcolor: "background.paper"
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              height: 180,
              objectFit: "contain",
              p: 2,
              bgcolor: "background.default"
            }}
          />
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              textTransform: "capitalize"
            }}
          />
        </Box>

        <CardContent sx={{ width: "100%" }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            noWrap
            gutterBottom
          >
            {product.category}
          </Typography>

          <Typography
            variant="h6"
            component="h3"
            sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}
            noWrap
          >
            {product.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1
            }}
          >
            <Typography variant="h6" color="primary.main">
              ${product.price.toFixed(2)}
            </Typography>
            {product.rating && (
              <Typography variant="body2" color="text.secondary">
                {product.rating.count} шт
              </Typography>
            )}
          </Box>

          {product.rating && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5
              }}
            >
              <Rating
                value={product.rating.rate}
                precision={0.1}
                readOnly
                size="small"
              />
              <Typography variant="caption" color="text.secondary">
                {product.rating.rate.toFixed(1)}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
