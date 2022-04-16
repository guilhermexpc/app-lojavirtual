import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export function LoadingIndicator(){
  const theme = useTheme();

  return (
    <ActivityIndicator 
      color={theme.colors.title}
      size="large"
      style={{ flex: 1}}
    />
  );
}