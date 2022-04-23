import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Modal, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { productCardKey } from '../../asyncstoragekey'
import api from '../../services/api';
import { productDto, productCartDto } from '../../dtos/productDto';
import { ProductItem } from '../../components/ProductItem';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import {
  CardIcon,
  Container, 
  Header, 
  HeaderContent,
  HeaderTitle,
  CartContent,
  CardQuantityContent,
  CardQuantityValue,
  ProductList,
} from './styles';


export function Products(){
  const navigation = useNavigation<any>();

  const [products, setProducts] = useState<productDto[]>([]);
  const [cartProductQuantity, setCartProductQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<productCartDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);


  function handleShoppingCart(){
    console.log(`cartProducts: ${JSON.stringify(cartProducts)}`);    
    navigation.navigate('ShoppingCart');
  }


  async function saveProduct(productId: number) {
    try {
      console.log('### handleProduct ###')
      const cartList = await AsyncStorage.getItem(productCardKey);      
      const currentCartList: productCartDto[] = cartList ? JSON.parse(cartList) : []; 
      let existingProduct = false;

      currentCartList.forEach(element => {
        if (element.productId == productId){
          element.quantity += 1;
          existingProduct = true;
        }
      });

      if (existingProduct){
        await AsyncStorage.setItem(productCardKey, JSON.stringify(currentCartList));
      }else{      
        const newProduct: productCartDto = {
          productId: productId,
          quantity: 1,
        };
        const cartProductList = [
          ...currentCartList,
          newProduct
        ]
        await AsyncStorage.setItem(productCardKey, JSON.stringify(cartProductList));
      }
      console.log('### CART LIST ###');
      console.log(await AsyncStorage.getItem(productCardKey));

      const newCartList = await AsyncStorage.getItem(productCardKey);      
      const newCurrentCartList: productCartDto[] = newCartList ? JSON.parse(newCartList) : []; 
      console.log(`newCurrentCartList lenght: ${newCurrentCartList.length}`);
      console.log(`newCurrentCartList list: ${JSON.stringify(newCurrentCartList)}`);
      setCartProducts(newCurrentCartList);
      console.log(`cartProducts: ${cartProducts}`);
      countCartProducts(newCurrentCartList);
    } catch (error) {
      console.log(error);
    }
  }

  function countCartProducts(cartProducts: productCartDto[]) {
    let cartQuantity = 0;
    console.log(`cartProducts: ${JSON.stringify(cartProducts)}`)
    cartProducts.forEach(product => {
      cartQuantity += product.quantity;      
    });
    console.log(`countCartProducts: ${cartQuantity}`);
    setCartProductQuantity(cartQuantity);
  }

  async function fetchProducts(){
    try {
      setLoading(true);
      const response = await api.get('/products/');   
      // console.log(response)
      setProducts(response.data)

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  function handleProduct(productId: number) {
    saveProduct(productId);
    Alert.alert('', 'This item has been added to your shopping cart.', [
      {text: 'View Shopping Cart', onPress: () => handleShoppingCart()},
      {text: 'Continue Shopping', onPress: () => console.log('opção 2')},
    ])
  }

  useEffect(() => {    
    fetchProducts();
  },[]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle>Produtos</HeaderTitle>
          <CartContent>
            <CardIcon name={'shoppingcart'} />
            {
              cartProductQuantity > 0 && (
                <CardQuantityContent>
                  <CardQuantityValue>{cartProductQuantity}</CardQuantityValue>
                </CardQuantityContent>
              )
            }           
          </CartContent>
        </HeaderContent>        
      </Header>

      <Button
        title='Clean'
        onPress={() => {AsyncStorage.clear(); console.log('reset storage'); setCartProductQuantity(0)}}
      />
      
      {loading ? 
        <LoadingIndicator />
      :
      <ProductList
        data={products}
        keyExtractor={item=> item.id}       
        onRefresh={() => fetchProducts()}
        refreshing={loading}   
        renderItem={({ item }) => 
          <ProductItem 
            data={item}
            onPress={() => {handleProduct(item.id)}}       
          />          
        }
      />      
    }

    </Container>
  );
}