export type ProductDocument = {
  createdAt: string;
  updatedAt: string;
  title: string;
  image: string;
  description: string;
  price: string;
}

export type ProductType = ProductDocument & { id: string; }
