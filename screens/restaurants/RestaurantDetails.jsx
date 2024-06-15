import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from "react-native-stock-star-rating";
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES, TAB_BAR_HEIGHT } from '../../constants/theme';
import NetworkImage from '../../components/reusable/NetworkImage';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import ReusableText from '../../components/reusable/ReusableText';
import ExpandableText from '../../components/reusable/ExpandableText';
import RestaurantReviewsList from './reviews/RestaurantReviewsList';
import AppBar from '../../components/reusable/AppBar';
import axios from 'axios';
import { BASE_URL } from '../../constants/config';

const windowWidth = Dimensions.get('window').width;

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurantId, userLogin } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurantDetails = useCallback(async () => {
    if (!restaurantId) {
      setError('Invalid restaurant ID');
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching restaurant details for restaurantId: ${restaurantId}`);
      const response = await axios.get(`${BASE_URL}/api/restaurants/${restaurantId}`);
      console.log('Fetched restaurant details:', response.data);
      setRestaurant(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurant details:', error.response || error.message || error);
      setError('Failed to load restaurant details.');
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchRestaurantDetails();
  }, [fetchRestaurantDetails, refresh]);

  const handleNavigationToLocation = () => {
    navigation.navigate('Location', {
      latitude: restaurant.coordinates.latitude,
      longitude: restaurant.coordinates.longitude,
      name: restaurant.name,
      reset: false,
    });
  };

  const handleReviews = () => {
    navigation.navigate("AddRestaurantReviews", { placeId: restaurant._id });
  };

  const handleDeleteReview = (deletedReviewId) => {
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      reviews: prevRestaurant.reviews.filter((review) => review._id !== deletedReviewId),
    }));
  };

  const handleReviewsNavigation = () => {
    navigation.navigate("AllRestaurantReviews", { 
      placeId: restaurant._id, 
      handleDeleteReview: (deletedReviewId) => {
        handleDeleteReview(deletedReviewId);
        fetchRestaurantDetails();
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.green} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.loader}>
        <Text>Failed to load restaurant details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.scrollView}>
      <View style={{ height: 80 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          title={restaurant.name}
          color={COLORS.grey}
          icon={"create-outline"}
          color1={COLORS.grey}
          onPress={() => navigation.goBack()}
          onPress1={handleReviews}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.container}>
            <NetworkImage
              source={restaurant.imageUrl}
              width={"100%"}
              height={220}
              radius={25}
            />
          </View>

          <View style={styles.titleContainer}>
            <View style={styles.titleColumn}>
              <View style={styles.rowWithSpace("space-between")}>
                <ReusableText
                  text={restaurant.name}
                  family={"medium"}
                  size={SIZES.xLarge}
                  color={COLORS.black}
                />
                <ReusableText
                  text={`${restaurant.hours}`}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
              <HeightSpacer height={10} />
              <ReusableText
                text={`${restaurant.location.city}, ${restaurant.location.country}`}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.black}
              />
              <HeightSpacer height={15} />
              <View style={styles.rowWithSpace("space-between")}>
                <Rating
                  maxStars={5}
                  stars={restaurant.rating}
                  bordered={false}
                  color={COLORS.green}
                />
                <ReusableText
                  text={`(${restaurant.reviewCount} reviews)`}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.container, { paddingTop: 90 }]}>
          <ReusableText
            text={"Description"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={10} />
          <ExpandableText text={restaurant.description} numberOfLines={3} />
          <HeightSpacer height={10} />
          <ReusableText
            text={"Location"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={15} />
          <ReusableText
            text={`${restaurant.location.city}, ${restaurant.location.country}`}
            family={"regular"}
            size={SIZES.small + 2}
            color={COLORS.gray}
          />
          <TouchableOpacity onPress={handleNavigationToLocation} style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: restaurant.coordinates.latitude,
                longitude: restaurant.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
            >
              <Marker coordinate={restaurant.coordinates} />
            </MapView>
          </TouchableOpacity>
          <View style={styles.rowWithSpace("space-between")}>
            <ReusableText
              text={"Reviews"}
              family={"medium"}
              size={SIZES.large}
              color={COLORS.black}
            />
            <TouchableOpacity
              onPress={handleReviewsNavigation}
            >
              <Feather name="list" size={20} />
            </TouchableOpacity>
          </View>
          <HeightSpacer height={10} />
          <RestaurantReviewsList reviews={restaurant.reviews} onDeleteReview={handleDeleteReview} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
    marginBottom: TAB_BAR_HEIGHT + 28,
  },
  container: {
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: -3,
    zIndex: 10
  },
  image: {
    width: windowWidth,
    height: 250,
  },
  titleContainer: {
    margin: 15,
    backgroundColor: COLORS.lightWhite,
    height: 120,
    position: "absolute",
    top: 170,
    left: 0,
    right: 0,
    borderRadius: 20
  },
  titleColumn: {
    padding: 15
  },
  rowWithSpace: (justifyContent) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: justifyContent
  }),
  detailSection: {
    padding: 20,
  },
  attractionName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.darkgray,
    marginBottom: 20,
  },
  mapContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  reviewsSection: {
    marginTop: 20,
  },
  reviewCard: {
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: SIZES.medium,
    color: COLORS.darkgray,
    marginBottom: 5,
  },
});

export default RestaurantDetails;
