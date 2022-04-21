export interface productDto {
  id: number;
  title: string;
  price: string;
  description: string
  category: string
  rating: {
    rate: string,
    count: string,
  };
  image: string;
}

export interface productCartDto {  
  productId: number;
  quantity: number;  
}