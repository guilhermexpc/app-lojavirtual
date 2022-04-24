import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons'; 
import { FlatList, FlatListProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';


import { productDto } from '../../dtos/productDto';


export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.header};  
  
  justify-content: center;
  padding: 16px 24px 0px;
  
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;  
  
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.headerTitle};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.TitlePoppins};
`
export const CartContent = styled(BorderlessButton)`
  width: 28px;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`

export const CartContentView = styled.View`
  width: 60px;
  height: 100%;
  background-color: red;
`

export const CardIcon = styled(AntDesign)`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.icon};
`;

export const CardQuantityContent = styled.View`
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.cart_price};;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  right: 12px;
  bottom: 16px;
  position: absolute;
`

export const CardQuantityValue = styled.Text`
  color: ${({ theme }) => theme.colors.headerTitle};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.RegularText};  
`

export const ProductListold = styled.View`
  padding: 14px;
`

export const ProductList = styled(FlatList as new () => FlatList<productDto>)
.attrs({  
  contentContainerStyle: {
    padding: 14
  },
  showsVerticalScrollIndicator: false
})``;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background_primary};
  opacity: 0.5;
`