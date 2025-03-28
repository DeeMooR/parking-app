import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/providers/AppProvider';
import { ModalSuccess } from './src/components';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    white: '#fff',
    black: '#2F2F2F',
    grey: '#d8dadc',
    placeholder: '#9e9e9e',
    blue: '#40B7AA',
    blueOpacity: '#40B7AAb3',
    blueGrey: '#678e9692',
    brown: '#4D3E3E',
    brownOpacity: '#4d3e3eb3',
    red: '#DF5A5A',
    green: '#4DB84D'
  },
};


const App = () => {
  return (
    <AppProvider>
      <NavigationContainer theme={MyTheme}>
        <AppNavigator />
        <ModalSuccess />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;