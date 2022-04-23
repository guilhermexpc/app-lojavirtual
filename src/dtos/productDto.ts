export interface productDto {
  id: number;
  title: string;
  price: number;
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
export interface productDtoWithQuantity extends productDto {
  quantity: number;
}