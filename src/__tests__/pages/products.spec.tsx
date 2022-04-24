import React from 'react'
import { render, fireEvent} from '@testing-library/react-native'
import { Products } from '../../pages/Products' 



describe('Products Pages', () => {
  test('teste', () => {
    const { getByTestId } = render(
      <Products />
    )
    const productList = getByTestId('flatlist-products');
    const headerTitle = getByTestId('text-headertittle');
    
    expect(headerTitle.props.children).toContain('Products');

    // await waitFor(() => {
    //   expect(productList.props.visible).toBeTruthy();
    // })

  })  
});
