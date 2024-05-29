import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calendar from '../screens/calendar/Calendar';
import EntryForm from '../screens/calendar/EntryForm';

const Stack = createNativeStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeCalendar" component={Calendar} />
      <Stack.Screen name="EntryForm" component={EntryForm} options={{ title: 'Add/Edit Entry' }} />
    </Stack.Navigator>
  );
};

export default CalendarStackNavigator;
