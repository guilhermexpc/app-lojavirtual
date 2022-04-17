import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


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