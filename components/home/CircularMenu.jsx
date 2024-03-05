import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';

const windowWidth = Dimensions.get('window').width;
const centralButtonSize = windowWidth * 0.35; // Example size for the central button
const buttonSize = centralButtonSize * 0.8; // Smaller size for surrounding buttons

const CircularMenu = () => {
  return (
    <View style={styles.container}>
      {/* Restaurants Button - Placed above the 'All' button */}
      <TouchableOpacity style={[styles.button, { 
       left: 280,
       bottom: 10,
      }]}>
        <Icon name="cutlery" size={30} color="#000" />
        <Text style={styles.buttonText}>Restaurants</Text>
      </TouchableOpacity>

      {/* Central 'All' Button */}
      <TouchableOpacity style={[styles.button, styles.centralButton]}>
        <Icon name="globe" size={30} color="#000" />
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>

      {/* Attractions Button - Placed to the left of the 'All' button */}
      <TouchableOpacity style={[styles.button, { 
       right: 265, 
       bottom: 60, 
      }]}>
        <Icon name="camera" size={30} color="#000" />
        <Text style={styles.buttonText}>Attractions</Text>
      </TouchableOpacity>

      {/* Events Button - Placed to the right of the 'All' button */}
      <TouchableOpacity style={[styles.button, { 
       right: 225,
       bottom: -210,
      }]}>
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
