import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HomeScreen, ParkingScreen, AccountScreen } from '../screens';
import { useOrientation } from '../utils';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  const { colors, isLandscape } = useOrientation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: isLandscape ? 70 : 80 },
        tabBarActiveTintColor: colors.blue,
      }}
    >
      <Tab.Screen
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Главная',
          tabBarIcon: ({ color }) => <MaterialIcons color={color} size={24} name='home' />,
        }}
      />
      <Tab.Screen
        name="Parking" 
        component={ParkingScreen} 
        options={{ 
          title: 'Паркинг',
          tabBarIcon: ({ color }) => <MaterialIcons color={color} size={22} name='access-time' />,
        }}
      />
      <Tab.Screen
        name="Account" 
        component={AccountScreen} 
        options={{ 
          title: 'Аккаунт',
          tabBarIcon: ({ color }) => <MaterialIcons color={color} size={24} name='person' />,
        }}
      />
    </Tab.Navigator>
  );
}
