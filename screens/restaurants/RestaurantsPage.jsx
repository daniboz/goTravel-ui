import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, TAB_BAR_HEIGHT } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import NoResultsScreen from '../../components/reusable/NoResultsScreen';
import { BASE_URL } from '../../constants/config';

const RestaurantsPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [restaurants, setRestaurants] = useState(route.params?.restaurants || []);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const query = route.params?.query || '';

  useEffect(() => {
    if (route.params?.filters) {
      console.log('Filters applied:', route.params.filters);
      const fetchFilteredRestaurants = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/restaurants/filter`, {
            params: { ...route.params.filters, query },
          });
          console.log('Filtered restaurants:', response.data.restaurants);
          setFilteredRestaurants(response.data.restaurants);
        } catch (error) {
          console.error('Error fetching filtered restaurants:', error);
        }
      };
      fetchFilteredRestaurants();
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [route.params]);

  const handleTryAgain = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {filteredRestaurants && filteredRestaurants.length > 0 ? (
          <>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => navigation.navigate('RestaurantsFilter', { query })}
            >
              <Text style={styles.filterButtonText}>Filter</Text>
              <Ionicons name="options-outline" size={24} color="black" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
            <ScrollView style={styles.restaurantsList}>
              {filteredRestaurants.map((restaurant, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.restaurantCard}
                  onPress={() => navigation.navigate('RestaurantDetails', { restaurantId: restaurant._id })}
                >
                  <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.imageText}>{restaurant.name}</Text>
                    <Text style={styles.hoursText}>{restaurant.hours}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : (
          <NoResultsScreen
            message="No restaurants found"
            buttonText="Try Again"
            onPress={handleTryAgain}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  restaurantsList: {
    marginTop: 10,
    marginBottom: TAB_BAR_HEIGHT,
  },
  restaurantCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  imageText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hoursText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
});

export default RestaurantsPage;
