export type ProductStatus = "available" | "sold";

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  status: ProductStatus;
};

export interface Props {
  product: Product;
  refetch?: () => void;
}
