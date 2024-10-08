import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginPage from '../screens/LoginPage/LoginPage'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CadastroPage from '../screens/CadastroPage/CadastroPage'
import HomePage from '../screens/home/HomePage'

export default function StackRoutes() {
    const Stack = createNativeStackNavigator()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name='Login' component={LoginPage} ></Stack.Screen>
            <Stack.Screen options={{headerShown:false}} name='Cadastro' component={CadastroPage} ></Stack.Screen>
            <Stack.Screen options={{headerShown:false}} name='Home' component={HomePage} ></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}