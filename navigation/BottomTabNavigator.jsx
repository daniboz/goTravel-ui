import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Calendar, Wallet, Location, Profile } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
//import TopTab from "./TopTab";

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
        component={Home}
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

      {/* <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      /> */}

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
    borderRadius: 30, // Adjust for circular shape
    width: 60,
    height: 60,
    marginBottom: 20, // Lifts the icon up
    backgroundColor: '#FFF', // Change as needed
  },
  customIconFocused: {
    // Additional styles for when the icon is focused
    // You can add a different background color or other styling
  },
  // ... your existing styles
});

export default BottomTabNavigation;
