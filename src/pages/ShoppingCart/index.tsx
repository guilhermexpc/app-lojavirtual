import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingIndicator } from '../../components/LoadingIndicator';



import api from '../../services/api';
import { ShoppingCartItem } from '../../components/ShoppingCartItem';
import { productCartDto, productDto, productDtoWithQuantity } from '../../dtos/productDto';

import {
  Container, 
  Header,
  HeaderTitle,
  HeaderContent,
  Content,
  CartList, 
  OrderSummary,
  OrderSummaryTotalContent,
  OrderSummaryTotal,
  OrderSummaryTitle,
  OrderSummaryDescription,
  OrderSummaryDescriptionAmout
  
} from './styles';
import { productCardKey } from '../../asyncstoragekey';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from '../../theme/globalStyles';



export function ShoppingCart(){
  const navigation = useNavigation();
  const route = useRoute();

  const [products, setProducts] = useState<productDtoWithQuantity[]>([]);
  const [cartAmout, setCartAmout] = useState(0);
  const [temp, setTemp] = useState(true);  
  
  const [loading, setLoading] = useState(true);

  async function fetchCartList(){
    try {
      setLoading(true);
      setTemp(true);
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
        setProducts(productCartResolved);
      }else{
        console.warn(`Erro no api.post('/carts'): ${response.status}, ${response.statusText}`)
      }         

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
      setTemp(false);
    }
  }

  async function getProducts(productId: string) {
    return await api.get(`/products/${productId}`)    
  }

  function AmoutCalc() {
    let amount = 0;
    products.forEach(item => {
      amount += item.price * item.quantity
    });

    console.log(`amount: ${amount}`)
    setCartAmout(amount);
  }

  function changeTemp() {    
    setTemp(!temp)    
  }

  function removeItem(id:number) {
    console.log(`removeItem: ${id}`)
    setProducts(
      products.filter((item) => {
        return item.id !== id
      })
    )
  }

  useEffect(() => {    
    fetchCartList();
  },[]);

  useEffect(() => {    
    AmoutCalc()
  },[temp]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Shopping Cart</HeaderTitle>         
        </HeaderContent>        
      </Header>  

      <Button
        title='Products'
        onPress={() => {console.log(`products: ${JSON.stringify(products)}`)}}
      />

      {loading ? 
        <LoadingIndicator />
      :
       <>
        <Content>
          <CartList
              data={products}
              keyExtractor={(item: productDtoWithQuantity) => item.id}       
              // onRefresh={() => fetchProducts()}
              // refreshing={loading}   
              renderItem={({ item }) => 
                <ShoppingCartItem 
                  data={item}   
                  changeAmount={() => changeTemp()}
                  removeItem={() => removeItem(item.id)}
                />    
              }
            />   

            <OrderSummary style={styles.defaultShadow}>
              <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
              <OrderSummaryTotal>
                <OrderSummaryTotalContent>
                  <OrderSummaryDescription>Total</OrderSummaryDescription>
                  <OrderSummaryDescriptionAmout>{`US $${cartAmout.toFixed(2)}`}</OrderSummaryDescriptionAmout>
                </OrderSummaryTotalContent>
              </OrderSummaryTotal>
            </OrderSummary>
        </Content>
         



       </>
        
      }  


    </Container>
  );
}