"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
} from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ width: "100%", justifyContent: "flex-end", px: 2, pb: 2 }}
        >
          <Button onClick={onClose} variant="outlined" disabled={loading}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {confirmText}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
