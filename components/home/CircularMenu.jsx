import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const centralButtonSize = windowWidth * 0.35; 
const buttonSize = centralButtonSize * 0.8;
const radius = centralButtonSize  ;
const angleOffset = Math.PI / 1.5; 
const startAngle = -Math.PI / 2;

const calculatePosition = (angle) => {
  return {
    left: radius * Math.cos(angle) + (windowWidth /2 - buttonSize / 2),
    top: radius * Math.sin(angle) + (windowWidth / 8 - buttonSize *1.35),
  };
};

const CircularMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/homeimage.jpeg')}
        style={styles.backgroundImage}
      />

      <TouchableOpacity style={[styles.button, calculatePosition(startAngle + angleOffset)]} onPress={()=> navigation.navigate('RestaurantsWhereTo')}>
        <Icon name="cutlery" size={30} color="#000" />
        <Text style={styles.buttonText}>Restaurants</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, calculatePosition(startAngle)]} onPress={()=> navigation.navigate('AttractionsWhereTo')}>
        <Icon name="camera" size={30} color="#000" />
        <Text style={styles.buttonText}>Attractions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, calculatePosition(startAngle - angleOffset)]} onPress={()=> navigation.navigate('EventsWhereTo')}>
        <Icon name="ticket" size={40} color="#000" />
        <Text style={styles.buttonText}>Events</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '55%', 
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
    backgroundColor: COLORS.green,
  },
  buttonText: {
    textAlign: 'center', 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#000', 
    marginTop: 4, 
    width: buttonSize, 
  },
  backgroundImage: {
    position: 'absolute',
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    top: windowHeight * 0.1 - radius,
    left: '50%',
    transform: [{ translateX: -radius }, { translateY: -radius }],
  },  
});

export default CircularMenu;
