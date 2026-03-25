export interface Product {
  id: number;
  code: string;
  name: string;

  categoryId: number;
  brandId: number;

  unitPrice: number;
  unitsInStock: number;
  discontinued: boolean;
}
