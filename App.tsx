import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar'
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { ThemeProvider } from 'styled-components/native';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

import { Teste } from './src/pages/Teste';
import theme from './src/theme';

export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular, 
    DMSerifDisplay_400Regular,
    Roboto_400Regular
  })

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='dark' translucent={true} backgroundColor="transparent" />
      <Teste />
    </ThemeProvider>
  );
}


