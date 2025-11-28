"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { useCreateProduct } from "@/hooks/useProducts";
import {
  ProductFormDialog,
  ProductFormValues,
} from "@/components/ProductFormDialog";

type CreateProductButtonProps = {
  categories: string[];
};

export function CreateProductButton({ categories }: CreateProductButtonProps) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: createProductMutation, isPending } = useCreateProduct();

  const handleSubmit = async (values: ProductFormValues) => {
    const price = values.price ? Number(values.price) : 0;

    let image = values.imageUrl.trim();
    if (!image && values.imageFile) {
      image = URL.createObjectURL(values.imageFile);
    }

    await createProductMutation({
      title: values.title || "Без названия",
      price,
      description: values.description || "",
      category: values.category || "other",
      image: image || "https://i.pravatar.cc/300",
    });

    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        disabled={isPending}
      >
        Добавить товар
      </Button>

      <ProductFormDialog
        open={open}
        mode="create"
        categories={categories}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </>
  );
}
