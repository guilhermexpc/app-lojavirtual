import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Modal, Text } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { productCardKey } from '../../asyncstoragekey'
import api from '../../services/api';
import { productDto, productCartDto } from '../../dtos/productDto';
import { ProductItem } from '../../components/ProductItem';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LoadingModal } from '../../components/LoadingModal';


import {
  CardIcon,
  Container, 
  Header, 
  HeaderContent,
  HeaderTitle,
  CartContent,
  CardQuantityContent,
  CardQuantityValue,
  ProductListContainer,  
} from './styles';


export function Products(){
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [products, setProducts] = useState<productDto[]>([]);
  const [cartProductQuantity, setCartProductQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<productCartDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  function handleShoppingCart(){    
    navigation.navigate('ShoppingCart');
  }

  async function saveProduct(productId: number) {
    try {      
      setModalVisible(true);
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
      await getCartProducts();
      setModalVisible(false);

      Alert.alert('', 'This item has been added to your shopping cart.', [
        {text: 'View Shopping Cart', onPress: () => {handleShoppingCart()}},
        {text: 'Continue Shopping', onPress: () => console.log('opção 2')},
      ])

    } catch (error) {
      console.log(error);
    }
  }


  async function fetchProducts(){
    try {
      setLoading(true);
      await getCartProducts();
      const response = await api.get('/products/');   
      setProducts(response.data)

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }
  
  async function getCartProducts() {
    const newCartList = await AsyncStorage.getItem(productCardKey);      
    const newCurrentCartList: productCartDto[] = newCartList ? JSON.parse(newCartList) : []; 
    setCartProducts(newCurrentCartList);    
  }

  function countCartProducts(cartProducts: productCartDto[]) {
    let cartQuantity = 0;
    cartProducts.forEach(product => {
      cartQuantity += product.quantity;      
    });
    setCartProductQuantity(cartQuantity);
  }

  function handleProduct(productId: number) {
    saveProduct(productId);
  }

  useEffect(() => {
    fetchProducts();

  }, [isFocused]);

  useEffect(() => {          
    countCartProducts(cartProducts);
  },[cartProducts]);


  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderTitle testID={'text-headertittle'}>Products</HeaderTitle>
          <GestureHandlerRootView>
            <CartContent
              onPress={() => handleShoppingCart()}
              enable={!loading}
            >
              <CardIcon name={'shoppingcart'} />
              {
                cartProductQuantity > 0 && (
                  <CardQuantityContent>
                    <CardQuantityValue>{cartProductQuantity}</CardQuantityValue>
                  </CardQuantityContent>
                )
              }           
            </CartContent>  
          </GestureHandlerRootView>
        </HeaderContent>        
      </Header>

      {/* <Button
        title='Clean'
        onPress={() => {AsyncStorage.clear(); console.log('reset storage'); setCartProductQuantity(0)}}
      /> */}

      {loading ? 
        <LoadingIndicator />
      :
      <ProductListContainer>
        <FlatList
            testID='flatlist-products'
            data={products}
            keyExtractor={item=> item.id}       
            onRefresh={() => fetchProducts()}
            refreshing={loading}      
            showsVerticalScrollIndicator={true}     
            renderItem={({ item }) => 
              <ProductItem 
                data={item}
                onPress={() => {handleProduct(item.id)}}       
              />          
            }
          />    
      </ProductListContainer>
        
    }

    {/* <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
    }}>
      <ModalContainer>
        <LoadingIndicator />        
      </ModalContainer>
    </Modal> */}

    <LoadingModal 
      modalVisible = {modalVisible}
      setModalVisible={() => setModalVisible(!modalVisible)}
    />

    </Container>
  );
}