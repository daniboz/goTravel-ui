import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigation from './BottomTabNavigator';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      <RootStack.Screen name="Main" component={BottomTabNavigation} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
