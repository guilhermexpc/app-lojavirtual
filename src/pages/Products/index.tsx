import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import api from '../../services/api';

import { productDto } from '../../dtos/productDto';
import { ProductItem } from '../../components/ProductItem';


import {
  CardIcon,
  Container, 
  Header, 
  HeaderContent,
  HeaderTitle,
  ProductList,
  ProductListold
} from './styles';

import { LoadingIndicator } from '../../components/LoadingIndicator';



export function Products(){
  const [products, setProducts] = useState<productDto[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts(){
    try {
      setLoading(true);
      const response = await api.get('/products/');   
      console.log(response)
      setProducts(response.data)

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);

    }
  } 

  useEffect(() => {
    
    fetchProducts();
  },[]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Produtos</HeaderTitle>
          <CardIcon name={'shoppingcart'} />
        </HeaderContent>        
      </Header>

      {loading ? 
        <LoadingIndicator />
      :
      <ProductList
        data={products}
        keyExtractor={item => item.id}       
        onRefresh={() => fetchProducts()}
        refreshing={loading}   
        renderItem={({ item }) => 
          <ProductItem 
            data={item}           
          />          
        }
      />

      //   <FlatList
      //   data={products}
      //   keyExtractor={item => item.id.toString()}
      //   onRefresh={() => fetchProducts()}
      //   refreshing={loading}
      //   renderItem={({ item }) => 
      //   <ProductItem 
      //     data={item}           
      //   />}
      // />
    }
    </Container>
  );
}