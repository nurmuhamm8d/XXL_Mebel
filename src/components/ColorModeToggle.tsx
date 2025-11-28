"use client";

import { IconButton, Tooltip } from "@mui/material";
import { useColorMode } from "@/app/providers";

export function ColorModeToggle() {
  const { mode, toggleColorMode } = useColorMode();

  const label = mode === "light" ? "Тёмная тема" : "Светлая тема";
  const symbol = mode === "light" ? "🌙" : "☀️";

  return (
    <Tooltip title={label}>
      <IconButton color="inherit" onClick={toggleColorMode}>
        <span role="img" aria-label={label}>
          {symbol}
        </span>
      </IconButton>
    </Tooltip>
  );
}
