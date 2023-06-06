import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bem-vindo' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho de Compras' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
