import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign } from '@expo/vector-icons'; 

export const Container = styled(RectButton)`
  width: 100%;
  height: 124px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 12px;
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
  color: ${({ theme  }) => theme.colors.details_title};
  font-size: ${RFValue(16)}px;  
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.RegularText};
  color: ${({ theme  }) => theme.colors.details_price};
  font-size: ${RFValue(14)}px;
`

export const RatingContent = styled.View`
  flex-direction: row; 
`

export const Rating = styled.Text`
  font-family: ${({ theme }) => theme.fonts.RegularText};
  color: ${({ theme  }) => theme.colors.text_detail};
  font-size: ${RFValue(14)}px;  
  margin-right: 6px;
`

export const RatingIcon = styled(AntDesign)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.start};
`

