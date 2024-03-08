import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const windowWidth = Dimensions.get('window').width;
const centralButtonSize = windowWidth * 0.35; // Example size for the central button
const buttonSize = centralButtonSize * 0.8; // Smaller size for surrounding buttons
const radius = centralButtonSize  ; // Increase this value to move buttons away from the central button

const angleOffset = Math.PI / 1.5; // 60 degrees in radians
const startAngle = -Math.PI / 2; // Start at the top (270 degrees)

// Function to calculate the position of each button
const calculatePosition = (angle) => {
  return {
    left: radius * Math.cos(angle) + (windowWidth /2 - buttonSize / 2),
    top: radius * Math.sin(angle) + (windowWidth / 8 - buttonSize),
  };
};

const CircularMenu = () => {
  return (
    <View style={styles.container}>
      {/* Restaurants Button - 120 degrees from the top */}
      <TouchableOpacity style={[styles.button, calculatePosition(startAngle + angleOffset)]}>
        <Icon name="cutlery" size={30} color="#000" />
        <Text style={styles.buttonText}>Restaurants</Text>
      </TouchableOpacity>

      {/* Central 'All' Button */}
      <TouchableOpacity style={[styles.button, styles.centralButton]}>
        <Icon name="globe" size={30} color="#000" />
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>

      {/* Attractions Button - Placed at the top */}
      <TouchableOpacity style={[styles.button, calculatePosition(startAngle)]}>
        <Icon name="camera" size={30} color="#000" />
        <Text style={styles.buttonText}>Attractions</Text>
      </TouchableOpacity>

      {/* Events Button - 240 degrees from the top */}
      <TouchableOpacity style={[styles.button, calculatePosition(startAngle - angleOffset)]}>
        <Icon name="ticket" size={40} color="#000" />
        <Text style={styles.buttonText}>Events</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '55%', // Adjust this value to move the menu up or down
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: buttonSize / 2,
    backgroundColor: '#FFF',
    // Add shadows and other styling as needed
  },
  centralButton: {
    position: 'absolute',
    //top: windowWidth /2 - centralButtonSize / 2,
    bottom: windowWidth / 5 - centralButtonSize,
    left: windowWidth / 2 - centralButtonSize / 2,
    width: centralButtonSize,
    height: centralButtonSize,
    borderRadius: centralButtonSize / 2,
    backgroundColor: COLORS.red, // Example color for "All" button
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center', // Center the text
    fontSize: 13, // Adjust font size to fit the button
    fontWeight: 'bold', // Optional: make the text bold
    color: '#000', // Set text color
    marginTop: 4, // Space between icon and text
    width: buttonSize, // Ensure text does not exceed the button width
  }
});

export default CircularMenu;
