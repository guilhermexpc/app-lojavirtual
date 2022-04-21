import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar'
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { ThemeProvider } from 'styled-components/native';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_500Medium, Poppins_300Light, } from '@expo-google-fonts/poppins';

import { Teste } from './src/pages/Teste';
import { Products } from './src/pages/Products';
import theme from './src/theme';

import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular, 
    DMSerifDisplay_400Regular,
    Roboto_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_300Light
  })

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='inverted' translucent={true} backgroundColor="transparent" />
      <Routes />
    </ThemeProvider>
  );
}


