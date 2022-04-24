import React from 'react';
import { Feather } from '@expo/vector-icons'
import { RectButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';

import { productDto } from '../../dtos/productDto';
import {
  Container,
  ImageContent,
  DetailsContent,
  TitleContent,
  ProductImage,
  Title,
  Description,
  Price,
  Rating,
  RatingIcon,
  RatingContent,

} from './styles';
import { styles } from '../../theme/globalStyles'

interface Props extends RectButtonProps {
  data: productDto;
  onPress: () => void;
}

export function ProductItem({data, onPress, ...rest} : Props){
  return (
    <GestureHandlerRootView>
      <Container 
        onPress={onPress}
        {...rest}
        style={styles.defaultShadow}
      >
        <ImageContent>
          <ProductImage 
            source={{uri: data.image }}
            resizeMode='contain'  
          />
        </ImageContent>

        <DetailsContent>
          <TitleContent><Title>{data.title}</Title></TitleContent>

          <Description>{data.description}</Description>
          <Price>U$ {data.price}</Price>

          <RatingContent>
            <Rating>{data.rating.rate}</Rating>
            <RatingIcon name='star' />
          </RatingContent>
        </DetailsContent>

      </Container>
    </GestureHandlerRootView>
  );
}