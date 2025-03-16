import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    white: '#fff',
    black: '#2F2F2F',
    grey: '#d8dadc',
    blue: '#40B7AA',
    brown: '#4D3E3E',
    brownOpacity: '#4d3e3eb3'
  },
};


const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default App;