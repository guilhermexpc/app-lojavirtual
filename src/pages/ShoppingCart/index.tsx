import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingIndicator } from '../../components/LoadingIndicator';



import api from '../../services/api';
import { ShoppingCartItem } from '../../components/ShoppingCartItem';
import { productCartDto, productDto } from '../../dtos/productDto';

import {
  Container, 
  Header,
  HeaderTitle,
  HeaderContent,
  CartList, 
  
} from './styles';
import { productCardKey } from '../../asyncstoragekey';

interface productDtoWithQuantity extends productDto {
  quantity: number;
}


export function ShoppingCart(){
  const navigation = useNavigation();
  const route = useRoute();

  const [products, setProducts] = useState<productDtoWithQuantity[]>([]);
  const [currentCartList2, setCurrentCartList2] = useState('')
  
  const [loading, setLoading] = useState(true);

  async function fetchCartList(){
    try {
      setLoading(true);
      const cartList = await AsyncStorage.getItem(productCardKey);      
      const currentCartList: productCartDto[] = cartList ? JSON.parse(cartList) : [];  

      const response = await api.post('/carts', {
        userId: 1,
        date: new Date(),
        products: currentCartList
      });   
      
      if (response.status === 200){
        const cartList = await AsyncStorage.getItem(productCardKey);      
        const currentCartList: productCartDto[] = cartList ? JSON.parse(cartList) : []; 

        console.log(`response.data: ${JSON.stringify(currentCartList)}`)

        let cartProductList: productDto[];

        const unresolved = currentCartList.map(async(element) => {
          console.log(`/products/${element.productId}`)
          const productResponse = await api.get(`/products/${element.productId}`)
           return productResponse.data;
         })       
         
         const resolved = await Promise.all(unresolved)
     
        let productCartResolved: productDtoWithQuantity[] = [];

        for (let index = 0; index < resolved.length; index++) {          
          console.log(`id: ${resolved[index].id}`); 
          console.log(`quantity: ${currentCartList[index].quantity}`); 
          console.log(`title: ${resolved[index].title}`); 
          console.log(`price: ${resolved[index].price}`); 
          console.log(`description: ${resolved[index].description}`); 
          console.log(`category: ${resolved[index].category}`); 
          console.log(`rate: ${resolved[index].rating.rate}`); 
          console.log(`count: ${resolved[index].rating.count}`); 
          console.log(`image: ${resolved[index].image}`);

          const product: productDtoWithQuantity = {
              id: resolved[index].id,
              quantity: currentCartList[index].quantity,
              title: resolved[index].title,
              price: resolved[index].price,
              description: resolved[index].description,
              category: resolved[index].category,
              rating: {
                rate: resolved[index].rating.rate,
                count: resolved[index].rating.count
              },
              image: resolved[index].image
            };
            productCartResolved.push(product);          
        }

        //  console.log(JSON.stringify(resolved));
         setProducts(productCartResolved)
      }else{
        console.warn(`Erro no api.post('/carts'): ${response.status}, ${response.statusText}`)
      }         

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  async function getProducts(productId: string) {
    return await api.get(`/products/${productId}`)    
  }

  useEffect(() => {    
    fetchCartList();
  },[]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Shopping Cart</HeaderTitle>         
        </HeaderContent>        
      </Header>  


      {loading ? 
        <LoadingIndicator />
      :
        <CartList
          data={products}
          keyExtractor={item=> item.id}       
          // onRefresh={() => fetchProducts()}
          // refreshing={loading}   
          renderItem={({ item }) => 
            <ShoppingCartItem 
              data={item}
              quantity={0}
            />    
          }
        />    
      }  
      


    </Container>
  );
}