import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';

import { productDto } from '../../dtos/productDto';
import { productDtoWithQuantity } from '../../dtos/productDto';

export const Container = styled.View`
  flex: 1;
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

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
`

export const CartList = styled(FlatList as new () => FlatList<productDtoWithQuantity>)
.attrs({  
  contentContainerStyle: {
    padding: 14
  },
  showsVerticalScrollIndicator: false
})``;

export const OrderSummary = styled.View`
  width: 100%;
  height: 84px;
  padding: 0px 12px 6px;
  background-color: ${({theme}) => theme.colors.productItem};
`;

export const OrderSummaryTotal = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`

export const OrderSummaryTotalContent= styled.View`
  width: 60%;
  flex-direction: row;
  justify-content: space-between;  
`

export const OrderSummaryTitle = styled.Text`
  color: ${({ theme  }) => theme.colors.subTitle};
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.TitlePoppins};
`

export const OrderSummaryDescription = styled.Text`
  color: ${({ theme  }) => theme.colors.title};;
  font-family: ${({theme}) => theme.fonts.RegularText};
  font-size: ${RFValue(16)}px;  
`

export const OrderSummaryDescriptionAmout = styled.Text`
  color: ${({ theme  }) => theme.colors.subTitle};
  font-family: ${({theme}) => theme.fonts.RegularText};
  font-size: ${RFValue(16)}px;  
`
