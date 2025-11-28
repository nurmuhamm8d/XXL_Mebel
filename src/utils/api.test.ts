import axios from "axios";
import {
  fetchProducts,
  fetchProductById,
  fetchCategories
} from "./api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProducts = [
  {
    id: 1,
    title: "Стул",
    price: 10,
    description: "Описание",
    category: "furniture",
    image: "image",
    rating: { rate: 4.5, count: 10 }
  }
];

describe("api", () => {
  test("fetchProducts возвращает список товаров", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });

    const result = await fetchProducts();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products"
    );
    expect(result).toEqual(mockProducts);
  });

  test("fetchProductById возвращает товар по id", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts[0] });

    const result = await fetchProductById(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/1"
    );
    expect(result).toEqual(mockProducts[0]);
  });

  test("fetchCategories возвращает список категорий", async () => {
    const categories = ["electronics", "furniture"];
    mockedAxios.get.mockResolvedValueOnce({ data: categories });

    const result = await fetchCategories();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/categories"
    );
    expect(result).toEqual(categories);
  });
});
