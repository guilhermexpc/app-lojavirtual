import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign, Entypo } from '@expo/vector-icons'; 

export const Container = styled.View`
  width: 100%; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 8px;
  border-radius: 12px;
  margin-bottom: 12px;

  background-color: ${({theme}) => theme.colors.productItem};
`;

export const ImageContent = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin-right: 8px;
`

export const DetailsContent = styled.View`
  flex: 1;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-start;
`

export const ProductImage = styled.Image`
  width: 98px;
  height: 98px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.RegularText};
  color: ${({ theme  }) => theme.colors.cart_Title};
  font-size: ${RFValue(16)}px;  
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.RegularText};
  color: ${({ theme  }) => theme.colors.cart_Title};
  font-size: ${RFValue(14)}px;  
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.RegularText};
  color: ${({ theme  }) => theme.colors.cart_price};
  font-size: ${RFValue(16)}px;
`

export const RatingContent = styled.View`
  flex-direction: row; 
`

export const Rating = styled.Text`
  font-family: ${({ theme }) => theme.fonts.RegularText};
  color: ${({ theme  }) => theme.colors.cart_details};
  font-size: ${RFValue(16)}px;  
  margin-right: 6px;
`

export const RatingIcon = styled(AntDesign)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.icon_star};
`
export const QuantityContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Quantity = styled.Text`
  font-family: ${({ theme }) => theme.fonts.RegularText};
  color: ${({ theme  }) => theme.colors.cart_Title};
  
  font-size: ${RFValue(16)}px;  
`;

export const QuantityButton = styled(RectButton)`
  width: 120px;
  height: 36px;
  background-color: blue;   
`