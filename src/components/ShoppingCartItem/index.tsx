import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { RectButtonProps, GestureHandlerRootView, FlatList, ScrollView } from 'react-native-gesture-handler';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

import { styles } from '../../theme/globalStyles';
import { IconeButton } from '../IconeButton';
import { productDto } from '../../dtos/productDto';
import {
  Container,
  ImageContent,
  DetailsContent,
  ProductImage,
  Title,  
  Price,
  Rating,
  RatingIcon,
  RatingContent,
  QuantityContent,
  Quantity,
} from './styles';
import theme from '../../theme';

interface productDtoWithQuantity extends productDto {
  quantity: number;
}
interface Props {
  data: productDtoWithQuantity;  
  changeAmount: () => void;
  removeItem: () => void;
}

export function ShoppingCartItem({data, changeAmount, removeItem}: Props){
  const [modalVisible, setModalVisible] = useState(true);
  const [cartData, setCartData] = useState<productDtoWithQuantity>();
  const [cartAmout, setCartAmout] = useState(0);

  useEffect(() => {
    setModalVisible(true);
    setCartData(data)
    setModalVisible(false);

  },[])

  useEffect(() => {
    setCartData(data)
    setModalVisible(false);

  },[modalVisible])
  
function handleChangeItemQuantity(value:number) {    
  if (data.quantity + value >= 1){
    data.quantity += value;
    setCartData(data)
    changeAmount();
  }
}

function handleRemoveItem(){
  Alert.alert('Are you sure about this?', 'This action will remove this item from your shopping cart.', [
    {text: 'OK', onPress: () => removeItem()},
    {text: 'Cancel', onPress: () => {}},
  ])
}

  return (    
    <Container style={styles.defaultShadow}>
      {
        modalVisible ? (
          <View>
            <Text>Carregando</Text>
          </View>
        ):
        (
        <>
        <ImageContent>
            <ProductImage 
              source={{uri: cartData.image }}
              resizeMode='contain'  
          />
        </ImageContent>

        <DetailsContent>        
          <Title>{cartData.title}</Title>        
          {/* <Description>{cartData.description}</Description> */}
          <Price>U$ {cartData.price}</Price>
          <RatingContent>
            <Rating>{cartData.rating.rate}</Rating>
            <RatingIcon name='star' />
          </RatingContent>
          
          <QuantityContent>          
            <IconeButton
              color={theme.colors.cart_price}
              iconeType='circle-with-minus'
              onPress={() => {handleChangeItemQuantity(-1)}}
            />
        
            <Quantity>{cartData.quantity}</Quantity>
            
            <IconeButton
              color={theme.colors.icon_success}
              iconeType='circle-with-plus'
              onPress={() => {handleChangeItemQuantity(1)}}
            />

            <IconeButton
              color={theme.colors.cart_price}
              iconeType='circle-with-cross'
              onPress={() => {handleRemoveItem()}}
            />

          </QuantityContent>
          </DetailsContent>
          </>
        )
      }

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
      }}>
      <ModalContainer>
        <ModalContent style={styles.defaultShadow}>
          <Title>Quantity</Title>
          <GestureHandlerRootView style={{width: '100%', alignItems: 'center'}}>
            <ModalItemButton
                onPress={() => setModalVisible(!modalVisible)}>
                <ModalItemDescription>{1} Item</ModalItemDescription>
            </ModalItemButton>
          </GestureHandlerRootView>
        </ModalContent>
      </ModalContainer>
    </Modal> */}
    </Container>    
  );
}