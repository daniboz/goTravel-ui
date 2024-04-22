import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Splashscreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigator';
import { Home, RestaurantsPage, AllPage, EventsPage, AttractionsPage } from './screens';
import AddReviews from './screens/reviews/AddReviews';
import AllReviews from './screens/reviews/AllReviews';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/regular.otf'),
    medium: require('./assets/fonts/medium.otf'),
    bold: require('./assets/fonts/bold.otf'),
    light: require('./assets/fonts/light.otf'),
    xtrabold: require('./assets/fonts/xtrabold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splashscreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar  />
      <Stack.Navigator>
      <Stack.Screen name='Bottom' component={BottomTabNavigation} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />  
      <Stack.Screen name='RestaurantsPage' component={RestaurantsPage} options={{ headerShown: false }} /> 
      <Stack.Screen name='AllPage' component={AllPage} options={{ headerShown: false }} /> 
      <Stack.Screen name='EventsPage' component={EventsPage} options={{ headerShown: false }} /> 
      <Stack.Screen name='AttractionsPage' component={AttractionsPage} options={{ headerShown: false }} />
      <Stack.Screen name="AddReviews" component={AddReviews} options={{ headerShown: false }}/> 
      <Stack.Screen name="AllReviews" component={AllReviews} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
