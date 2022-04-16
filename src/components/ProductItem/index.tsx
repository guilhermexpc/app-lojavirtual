import React from 'react';
import { Feather } from '@expo/vector-icons'
import { RectButtonProps } from 'react-native-gesture-handler';



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

} from './styles';

interface Props extends RectButtonProps {
  data: productDto;
}

export function ProductItem({data, ...rest} : Props){
  return (
    <Container {...rest}>
      <ImageContent>
        <ProductImage 
          source={{uri: data.image }}
          resizeMode='contain'  
        />
      </ImageContent>


      <DetailsContent>
        <Title>{data.title}</Title>
        <Price>U$ {data.price}</Price>

        <RatingContent>
          <Rating>{data.rating.rate}</Rating>
          <RatingIcon name='star' />
        </RatingContent>
      </DetailsContent>

    </Container>
  );
}