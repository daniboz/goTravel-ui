import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import AttractionsPage from '../screens/attractions/AttractionsPage';
import AttractionDetail from '../screens/attractions/AttractionDetail';
import RestaurantsPage from '../screens/restaurants/RestaurantsPage';
import EventsPage from '../screens/events/EventsPage';
import AllPage from '../screens/all/AllPage';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="AttractionsPage" component={AttractionsPage} />
      <Stack.Screen name="AttractionDetail" component={AttractionDetail} />
      <Stack.Screen name="RestaurantsPage" component={RestaurantsPage} />
      <Stack.Screen name="EventsPage" component={EventsPage} />
      <Stack.Screen name="AllPage" component={AllPage} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
