"use client";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

type DeleteProductDialogProps = {
  open: boolean;
  title: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteProductDialog({
  open,
  title,
  loading,
  onCancel,
  onConfirm,
}: DeleteProductDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Удалить товар</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 1,
            mb: 1,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(244, 67, 54, 0.08)",
              fontSize: 32,
            }}
          >
            🗑️
          </Box>
          <Typography align="center">Точно удалить товар «{title}»?</Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Действие нельзя отменить в рамках текущей сессии.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onCancel}
          disabled={loading}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Удаляем..." : "Удалить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

