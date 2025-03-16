import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HomeScreen, ParkingScreen, AccountScreen } from '../screens';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          title: 'Главная',
          tabBarIcon: ({ color }) => <MaterialIcons color={color} size={24} name='home' />,
        }}
      />
      <Tab.Screen
        name="Parking" 
        component={ParkingScreen} 
        options={{ 
          headerShown: false,
          title: 'Паркинг',
          tabBarIcon: ({ color }) => <MaterialIcons color={color} size={24} name='access-time' />,
        }}
      />
      <Tab.Screen
        name="Account" 
        component={AccountScreen} 
        options={{ 
          headerShown: false,
          title: 'Аккаунт',
          tabBarIcon: ({ color }) => <MaterialIcons color={color} size={24} name='person' />,
        }}
      />
    </Tab.Navigator>
  );
}
