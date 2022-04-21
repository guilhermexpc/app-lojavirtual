import React, { useState } from 'react';
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
  Description,
  Price,
  Rating,
  RatingIcon,
  RatingContent,
  QuantityContent,
  QuantityButton,
  Quantity,
  ModalContainer,
  ModalContent,
  ModalItemButton,
  ModalItemDescription,
  QuantityIconPlus,
  QuantityIconMinus
} from './styles';

interface productDtoWithQuantity extends productDto {
  quantity: number;
}

interface Props extends RectButtonProps {
  data: productDtoWithQuantity;
  quantity: Number;
}



export function ShoppingCartItem({data} : Props){
  const [modalVisible, setModalVisible] = useState(false);

  const maxItens:number[] = [1,2,3];

  return (    
      <Container>
        <ImageContent>
          <ProductImage 
            source={{uri: data.image }}
            resizeMode='contain'  
          />
        </ImageContent>

       

        <DetailsContent>        
          <Title>{data.title}</Title>        
          {/* <Description>{data.description}</Description> */}
          <Price>U$ {data.price}</Price>
          <RatingContent>
            <Rating>{data.rating.rate}</Rating>
            <RatingIcon name='star' />
          </RatingContent>

          
          <QuantityContent>
            <GestureHandlerRootView>
              <QuantityButton 
                title=''
                onPress={() => {}}
              >
              </QuantityButton>
            </GestureHandlerRootView>
          </QuantityContent>

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

      <Pressable style={[stylesT.button, stylesT.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={stylesT.textStyle}>Show Modal</Text>
      </Pressable>

        </DetailsContent>
      </Container>    
  );
}

const stylesT = StyleSheet.create({
  
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});