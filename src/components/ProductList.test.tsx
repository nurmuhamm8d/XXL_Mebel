import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { ProductList } from "./ProductList";
import { Product } from "@/types";

const theme = createTheme();

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

const products: Product[] = [
  {
    id: 1,
    title: "Стул",
    price: 10,
    description: "Описание стула",
    category: "furniture",
    image: "image",
    rating: { rate: 4.5, count: 10 }
  }
];

test("ProductList отображает товары", () => {
  renderWithTheme(
    <ProductList
      products={products}
      isLoading={false}
      total={products.length}
      page={1}
      pageSize={9}
      onPageChange={() => {}}
    />
  );

  expect(screen.getByText("Стул")).toBeInTheDocument();
  expect(screen.getByText("$10.00")).toBeInTheDocument();
});
