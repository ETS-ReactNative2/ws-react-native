import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import "firebase/auth";
import HomeScreen from './components/Screens/HomeScreen';
import LoginScreen from './components/Auth/LoginScreen';
import SignUpScreen from './components/Auth/SignUpScreen';
import ProfileScreen from './components/Auth/ProfileScreen';
import ShoppingList from './components/Screens/ShoppingList';
import ListDetails from './components/Screens/ListDetails';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTransparent: true }}>
        <Stack.Screen name="Connexion" component={LoginScreen} />
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Profil" component={ProfileScreen} />
        <Stack.Screen name='Vos listes de courses' component={ShoppingList} />
        <Stack.Screen name="Détails de votre liste" component={ListDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}