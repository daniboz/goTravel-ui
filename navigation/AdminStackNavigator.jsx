import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHome from '../screens/admin/AdminHome';
import AdminRestaurantsPage from '../screens/admin/AdminRestaurantsPage';
import AdminRestaurantForm from '../screens/admin/AdminRestaurantForm';

const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AdminRestaurantsPage" component={AdminRestaurantsPage} />
      <Stack.Screen name="AdminRestaurantForm" component={AdminRestaurantForm} />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;
