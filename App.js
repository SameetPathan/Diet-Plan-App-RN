import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {Animated } from 'react-native';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';


const Stack = createStackNavigator();
const opacity = new Animated.Value(0);

Animated.timing(opacity, {
  toValue: 1,
  duration: 500,
}).start();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Login"  component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home"  component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

