import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from '../screens/admin/home/AdminHome';
import AdminRestaurantForm from '../screens/admin/restaurants/AdminRestaurantForm';
import AdminRestaurantsPage from '../screens/admin/restaurants/AdminRestaurantsPage';
import AdminAttractionForm from '../screens/admin/attractions/AdminAttractionForm';
import AdminAttractionsPage from '../screens/admin/attractions/AdminAttractionsPage';
import AdminEventForm from '../screens/admin/events/AdminEventForm';
import AdminEventsPage from '../screens/admin/events/AdminEventsPage';

const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AdminRestaurantsPage" component={AdminRestaurantsPage} />
      <Stack.Screen name="AdminRestaurantForm" component={AdminRestaurantForm} />
      <Stack.Screen name="AdminAttractionsPage" component={AdminAttractionsPage} />
      <Stack.Screen name="AdminAttractionForm" component={AdminAttractionForm} />
      <Stack.Screen name="AdminEventsPage" component={AdminEventsPage} />
      <Stack.Screen name="AdminEventForm" component={AdminEventForm} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
