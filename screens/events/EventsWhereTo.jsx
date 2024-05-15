import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SearchComponent from '../../components/search/SearchComponent';
import { COLORS } from '../../constants/theme';

// Sample data for popular event destinations
const popularDestinations = [
  {
    id: '1',
    city: 'Paris',
    country: 'France'
  },
  {
    id: '2',
    city: 'Tokyo',
    country: 'Japan'
  },
  {
    id: '3',
    city: 'New York',
    country: 'USA'
  },
  {
    id: '4',
    city: 'Sydney',
    country: 'Australia'
  },
  {
    id: '5',
    city: 'Cairo',
    country: 'Egypt'
  }
];

const DestinationCard = ({ destination, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <View style={styles.iconContainer}>
      <Ionicons name="location-outline" size={24} color={COLORS.primary} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{destination.city}</Text>
      <Text style={styles.cardDescription}>{destination.country}</Text>
    </View>
  </TouchableOpacity>
);

const EventsWhereTo = () => {
  const navigation = useNavigation();

  const handleSelectDestination = (destination) => {
    navigation.navigate('EventsPage', { location: `${destination.city}, ${destination.country}` });
  };

  const navigateToEventsPage = () => {
    navigation.navigate('EventsPage');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchComponent />
      <ScrollView contentContainerStyle={styles.container}>
        {popularDestinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onPress={() => handleSelectDestination(destination)}
          />
        ))}
        <Button
          title="View All Events"
          onPress={navigateToEventsPage}
          color={COLORS.red}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.secondary,
  }
});

export default EventsWhereTo;
