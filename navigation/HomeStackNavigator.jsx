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
import EventsWhereTo from '../screens/events/EventsWhereTo';
import EventDetails from '../screens/events/EventDetails';
import AttractionsFilter from '../screens/attractions/AttractionsFilter';
import AddAttractionReviews from '../screens/attractions/reviews/AddAttractionReviews';
import AllAttractionReviews from '../screens/attractions/reviews/AllAttractionReviews';
import AddRestaurantReviews from '../screens/restaurants/reviews/AddRestaurantReviews';
import AllRestaurantReviews from '../screens/restaurants/reviews/AllRestaurantReviews';
import AllEventReviews from '../screens/events/reviews/AllEventReviews';
import AddEventReviews from '../screens/events/reviews/AddEventReviews';
import EventsFilter from '../screens/events/EventsFilter';
import RestaurantsFilter from '../screens/restaurants/RestaurantsFilter';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="AttractionsWhereTo" component={AttractionsWhereTo} />
      <Stack.Screen name="AttractionsPage" component={AttractionsPage} />
      <Stack.Screen name="AttractionDetails" component={AttractionDetails} />
      <Stack.Screen name="AttractionsFilter" component={AttractionsFilter} />
      <Stack.Screen name="AddAttractionReviews" component={AddAttractionReviews} options={{ headerShown: false }}/> 
      <Stack.Screen name="AllAttractionReviews" component={AllAttractionReviews} options={{ headerShown: false }}/>
      <Stack.Screen name="RestaurantsWhereTo" component={RestaurantsWhereTo} />
      <Stack.Screen name="RestaurantsPage" component={RestaurantsPage} />
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen name="RestaurantsFilter" component={RestaurantsFilter} />
      <Stack.Screen name='AddRestaurantReviews' component={AddRestaurantReviews} options={{ headerShown: false }} /> 
      <Stack.Screen name='AllRestaurantReviews' component={AllRestaurantReviews} options={{ headerShown: false }} /> 
      <Stack.Screen name="EventsWhereTo" component={EventsWhereTo} />
      <Stack.Screen name="EventsPage" component={EventsPage} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="EventsFilter" component={EventsFilter} />
      <Stack.Screen name='AddEventReviews' component={AddEventReviews} options={{ headerShown: false }} />
      <Stack.Screen name='AllEventReviews' component={AllEventReviews} options={{ headerShown: false }} />
      <Stack.Screen name="AllPage" component={AllPage} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
