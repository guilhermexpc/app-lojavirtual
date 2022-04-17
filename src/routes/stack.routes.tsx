import { createStackNavigator,  } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Products } from '../pages/Products';
import { ShoppingCart } from '../pages/ShoppingCart';

const Stack = createStackNavigator();
const { Navigator, Screen } = createNativeStackNavigator();


export function StackRoutes() {
  return (
    <Navigator 
      screenOptions={{
        headerShown: false      
      }}>
      <Screen name="ShoppingCart" component={ShoppingCart} />
      <Screen name="Products" component={Products} />
    </Navigator>
  )
}