"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import type { PaletteMode } from "@mui/material";
import { AuthProvider } from "@/contexts/AuthContext";

type ColorMode = PaletteMode;

type ColorModeContextValue = {
  mode: ColorMode;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined
);

export function useColorMode() {
  const ctx = useContext(ColorModeContext);
  if (!ctx) {
    throw new Error(
      "useColorMode must be used within ColorModeContext.Provider"
    );
  }
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mode, setMode] = useState<ColorMode>("light");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem("color-mode");
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          if (typeof window !== "undefined") {
            window.localStorage.setItem("color-mode", next);
          }
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#5D4037" : "#FFB74D",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1E1E1E",
          },
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ColorModeContext.Provider>
  );
}
