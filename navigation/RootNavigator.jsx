import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigation from './BottomTabNavigator';
import AdminStackNavigator from './AdminStackNavigator';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        user?.isAdmin ? (
          <RootStack.Screen name="Admin" component={AdminStackNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={BottomTabNavigation} />
        )
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
