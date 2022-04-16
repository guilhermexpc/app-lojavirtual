import React from 'react';
import { ProductItem } from '../../components/ProductItem';

import {
  CardIcon,
  Container, 
  Header, 
  HeaderContent,
  HeaderTitle,
  ProductList
} from './styles';

export function Products(){
  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Produtos</HeaderTitle>
          <CardIcon name={'shoppingcart'} />
        </HeaderContent>        
      </Header>
      <ProductList>
        <ProductItem 
          data={
                  {
                    thumbnail:'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
                    title:'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
                    price: '29.99',
                    category:'',
                    description:'',
                    rating:'4.9'                  
                  }
                }
        />

<ProductItem 
          data={
                  {
                    thumbnail:'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
                    title:'Mens Casual Slim Fit',
                    price: '19.99',
                    category:'',
                    description:'',
                    rating:'2.9'                  
                  }
                }
        />
      </ProductList>
    </Container>
  );
}