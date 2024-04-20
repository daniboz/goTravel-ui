import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import { Home, Calendar, Wallet, Location, Profile } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

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

const CustomTabBarIcon = (props) => {
  return (
    <View style={props.focused ? styles.customIconFocused : styles.customIcon}>
      <Ionicons name={props.name} size={26} color={props.focused ? COLORS.red : COLORS.gray} />
    </View>
  );
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
        component={Location}
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
      />

<Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              name={focused ? "calendar" : "calendar-outline"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
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
