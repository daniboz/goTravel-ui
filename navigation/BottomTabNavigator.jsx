import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import { Home, Calendar } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import LocationScreen from "../screens/location/Location";
import CalendarStackNavigator from "./CalendarStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 12,
  height: 55,
  position: "absolute",
  bottom: 30,
  left: 20,
  right: 20,
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Location"
        component={LocationScreen}
        initialParams={{ reset: true }} // Always start with an empty params object
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('Location', { reset: true });
          },
        })}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarStackNavigator}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name={focused ? "calendar" : "calendar-outline"}
              size={26} 
              color={focused ? COLORS.red : COLORS.gray} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile Settings"
        component={ProfileStackNavigator}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, 
    width: 60,
    height: 60,
    marginBottom: 20, 
    backgroundColor: '#FFF', 
  },
});

export default BottomTabNavigation;

