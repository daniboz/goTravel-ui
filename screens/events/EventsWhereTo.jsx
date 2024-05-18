import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Button, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import SearchComponent from '../../components/search/SearchComponent';
import axios from 'axios';

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
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      Alert.alert('Invalid Search', 'Please enter a city, country, or event.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5003/api/search', {
        params: { query },
      });
      navigation.navigate('EventsPage', { events: response.data.events });
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDestination = (destination) => {
    handleSearch(destination.city);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchComponent onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Most Popular Places</Text>
          {popularDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onPress={() => handleSelectDestination(destination)}
            />
          ))}
        </ScrollView>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.red,
    marginBottom: 20,
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
