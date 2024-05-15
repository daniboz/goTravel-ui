import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import AttractionsPage from '../screens/attractions/AttractionsPage';
import RestaurantsPage from '../screens/restaurants/RestaurantsPage';
import EventsPage from '../screens/events/EventsPage';
import AllPage from '../screens/all/AllPage';
import AttractionsWhereTo from '../screens/attractions/AttractionsWhereTo';
import RestaurantDetails from '../screens/restaurants/RestaurantDetails';
import AttractionDetails from '../screens/attractions/AttractionDetails';
import RestaurantsWhereTo from '../screens/restaurants/RestaurantsWhereTo';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="AttractionsWhereTo" component={AttractionsWhereTo} />
      <Stack.Screen name="AttractionsPage" component={AttractionsPage} />
      <Stack.Screen name="AttractionDetails" component={AttractionDetails} />
      <Stack.Screen name="RestaurantsWhereTo" component={RestaurantsWhereTo} />
      <Stack.Screen name="RestaurantsPage" component={RestaurantsPage} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="EventsPage" component={EventsPage} />
      <Stack.Screen name="AllPage" component={AllPage} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
