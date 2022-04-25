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
import { LoadingModal } from '../../components/LoadingModal';
import { Quantity } from '../../components/ShoppingCartItem/styles';



export function ShoppingCart(){
  const navigation = useNavigation();
  const route = useRoute();

  const [products, setProducts] = useState<productDtoWithQuantity[]>([]);
  const [cartProducts, setCartProducts] = useState<productCartDto[]>([]);
  const [cartAmout, setCartAmout] = useState(0);
  const [temp, setTemp] = useState(true);  
  
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
 
  async function fetchCartList(){
    try {
      setLoading(true);
      setTemp(true);
      const cartList = await AsyncStorage.getItem(productCardKey);      
      const currentCartList: productCartDto[] = cartList ? JSON.parse(cartList) : [];  

      // Fake post
      const response = await api.post('/carts', {
        userId: 1,
        date: new Date(),
        products: currentCartList
      });   
      
      if (response.status === 200){
        const cartList = await AsyncStorage.getItem(productCardKey);      
        const currentCartList: productCartDto[] = cartList ? JSON.parse(cartList) : []; 
        setCartProducts(currentCartList);
      
        let cartProductList: productDto[];

        const unresolved = currentCartList.map(async(element) => {
          const productResponse = await api.get(`/products/${element.productId}`)
           return productResponse.data;
         })       
         
         const resolved = await Promise.all(unresolved)
     
        let productCartResolved: productDtoWithQuantity[] = [];

        for (let index = 0; index < resolved.length; index++) {     
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

  async function saveProducts(isRemoveItem: boolean) {
    setModalVisible(true);
    if (products.length > 0 || isRemoveItem){
      await AsyncStorage.setItem(productCardKey, JSON.stringify(cartProducts));                      
      const cartList = await AsyncStorage.getItem(productCardKey);      
    }

    setModalVisible(false);
  }

  function productToCartProducts() {
    const newCartProducts: productCartDto[] = products.map((item) => {
       const cartProduct2: productCartDto = {
        productId: item.id,
        quantity: item.quantity
      }

      return cartProduct2;
    })
    setCartProducts(newCartProducts)
  }

  async function getCartProducts() {
    const newCartList = await AsyncStorage.getItem(productCardKey);      
    const newCurrentCartList: productCartDto[] = newCartList ? JSON.parse(newCartList) : []; 
    setCartProducts(newCurrentCartList);    
  }

  function CalculateAmount() {
    productToCartProducts();  

    let amount = 0;
    if (products.length > 0){
      products.forEach(item => {
        amount += item.price * item.quantity
      }); 
    }
    setCartAmout(amount);

  }

  function changeTemp() {    
    setTemp(!temp)    
    setProducts(products)
  }

  async function removeItem(id:number) {
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
    CalculateAmount()
  },[products]);

  useEffect(() => {    
    saveProducts(false);
  },[cartProducts]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Shopping Cart</HeaderTitle>         
        </HeaderContent>        
      </Header>  

      {/* <Button
        title='Products'
        onPress={() => {console.log(`products: ${JSON.stringify(products)}`)}}
      /> */}

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
                  changeAmount={() => CalculateAmount()}
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

      <LoadingModal 
        modalVisible = {modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
      />


    </Container>
  );
}