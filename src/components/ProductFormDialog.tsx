"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

export type ProductFormValues = {
  title: string;
  price: string;
  description: string;
  category: string;
  imageUrl: string;
  imageFile: File | null;
};

type Mode = "create" | "edit";

type ProductFormDialogProps = {
  open: boolean;
  mode: Mode;
  categories: string[];
  initialProduct?: {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function ProductFormDialog({
  open,
  mode,
  categories,
  initialProduct,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ProductFormDialogProps) {
  const [values, setValues] = useState<ProductFormValues>({
    title: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    imageFile: null,
  });

  useEffect(() => {
    if (!open) {
      return;
    }
    if (initialProduct) {
      setValues({
        title: initialProduct.title,
        price: String(initialProduct.price),
        description: initialProduct.description,
        category: initialProduct.category,
        imageUrl: initialProduct.image,
        imageFile: null,
      });
    } else {
      setValues({
        title: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
        imageFile: null,
      });
    }
  }, [open, initialProduct]);

  const handleChange =
    (field: keyof ProductFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setValues((prev) => ({
      ...prev,
      imageFile: file || null,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const titleText =
    mode === "create" ? "Добавить товар" : "Редактировать товар";

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>{titleText}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Название"
              value={values.title}
              onChange={handleChange("title")}
              fullWidth
            />
            <TextField
              label="Цена"
              type="number"
              value={values.price}
              onChange={handleChange("price")}
              fullWidth
              inputProps={{ min: 0, step: "0.01" }}
            />
            <TextField
              label="Описание"
              value={values.description}
              onChange={handleChange("description")}
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              label="Категория"
              select
              value={values.category}
              onChange={handleChange("category")}
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="URL изображения"
              value={values.imageUrl}
              onChange={handleChange("imageUrl")}
              fullWidth
            />
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                Или выбери файл изображения
              </Typography>
              <Button variant="outlined" component="label">
                Выбрать файл
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {values.imageFile && (
                <Typography variant="caption" color="text.secondary">
                  {values.imageFile.name}
                </Typography>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Отмена
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "create" ? "Создать" : "Сохранить"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
