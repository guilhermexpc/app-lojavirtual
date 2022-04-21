import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { BorderlessButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';


import {
  Container
} from './styles';
import theme from '../../theme';

export interface Props extends BorderlessButtonProps{
  color: string;
  iconeType: 'circle-with-plus' | 'circle-with-minus'
  
}

export function IconeButton({ color, iconeType, ...rest }: Props){
  return (
                
    <GestureHandlerRootView style={{flex:1,  width: 100, height:100}}> 
      <Container {...rest}>
        {/* <Entypo 
          name={iconeType}
          size={36}
          color={color}      
        /> */}
      </Container>
    </GestureHandlerRootView>
  );
}