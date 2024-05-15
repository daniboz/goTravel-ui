import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Splashscreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigator';
import { Home, RestaurantsPage, AllPage, EventsPage, AttractionsPage } from './screens';
import AttractionsWhereTo from './screens/attractions/AttractionsWhereTo';
import AttractionsFilter from './screens/attractions/AttractionsFilter';
import AddAttractionReviews from './screens/attractions/reviews/AddAttractionReviews';
import AllAttractionReviews from './screens/attractions/reviews/AllAttractionReviews';
import AddRestaurantReviews from './screens/restaurants/reviews/AddRestaurantReviews';
import AllRestaurantReviews from './screens/restaurants/reviews/AllRestaurantReviews';
import RestaurantsWhereTo from './screens/restaurants/RestaurantsWhereTo';
import RestaurantsFilter from './screens/restaurants/RestaurantsFilter';
import EventsWhereTo from './screens/events/EventsWhereTo';
import EventsFilter from './screens/events/EventsFilter';
import AddEventReviews from './screens/events/reviews/AddEventReviews';
import AllEventReviews from './screens/events/reviews/AllEventReviews';

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
      <Stack.Screen name='RestaurantsWhereTo' component={RestaurantsWhereTo} options={{ headerShown: false }} /> 
      <Stack.Screen name='RestaurantsPage' component={RestaurantsPage} options={{ headerShown: false }} />
      <Stack.Screen name='RestaurantsFilter' component={RestaurantsFilter} options={{ headerShown: false }} />
      <Stack.Screen name='AddRestaurantReviews' component={AddRestaurantReviews} options={{ headerShown: false }} /> 
      <Stack.Screen name='AllRestaurantReviews' component={AllRestaurantReviews} options={{ headerShown: false }} /> 
      <Stack.Screen name='AllPage' component={AllPage} options={{ headerShown: false }} /> 
      <Stack.Screen name='EventsWhereTo' component={EventsWhereTo} options={{ headerShown: false }} />
      <Stack.Screen name='EventsPage' component={EventsPage} options={{ headerShown: false }} />
      <Stack.Screen name='EventsFilter' component={EventsFilter} options={{ headerShown: false }} />
      <Stack.Screen name='AddEventReviews' component={AddEventReviews} options={{ headerShown: false }} />
      <Stack.Screen name='AllEventReviews' component={AllEventReviews} options={{ headerShown: false }} />
      <Stack.Screen name='AttractionsWhereTo' component={AttractionsWhereTo} options={{ headerShown: false }} /> 
      <Stack.Screen name='AttractionsPage' component={AttractionsPage} options={{ headerShown: false }} />
      <Stack.Screen name='AttractionsFilter' component={AttractionsFilter} options={{ headerShown: false }} />
      <Stack.Screen name="AddAttractionReviews" component={AddAttractionReviews} options={{ headerShown: false }}/> 
      <Stack.Screen name="AllAttractionReviews" component={AllAttractionReviews} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
