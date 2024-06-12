import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Rating } from "react-native-stock-star-rating";
import EventReviewsList from './reviews/EventReviewsList';
import AppBar from '../../components/reusable/AppBar';
import NetworkImage from '../../components/reusable/NetworkImage';
import { COLORS, SIZES, TAB_BAR_HEIGHT } from '../../constants/theme';
import ReusableText from '../../components/reusable/ReusableText';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import ExpandableText from '../../components/reusable/ExpandableText';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

const EventDetails = ({ route, navigation }) => {
  const { eventId, userLogin } = route.params;
  const [event, setEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEventDetails = useCallback(async () => {
    if (!eventId) {
      setError('Invalid event ID');
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching event details for eventId: ${eventId}`);
      const response = await axios.get(`http://localhost:5003/api/events/${eventId}`);
      console.log('Fetched event details:', response.data);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event details:', error.response || error.message || error);
      setError('Failed to load event details.');
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails, refresh]);

  const handleNavigationToLocation = () => {
    navigation.navigate('Location', {
      latitude: event.coordinates.latitude,
      longitude: event.coordinates.longitude,
      name: event.name,
      reset: false,
    });
  };

  const handleReviews = () => {
    if (userLogin) {
      navigation.navigate("AddEventReviews", { placeId: event._id });
    } else {
      Alert.alert("Auth Error", "Please login to add comments", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => { navigation.navigate('AuthTop') },
        },
        { defaultIndex: 1 },
      ]);
    }
  };

  const handleReviewsMock = () => {
    navigation.navigate("AddEventReviews", { placeId: event._id });
  };

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  const handleDeleteReview = (deletedReviewId) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      reviews: prevEvent.reviews.filter((review) => review._id !== deletedReviewId),
    }));
  };

  const handleReviewsNavigation = () => {
    navigation.navigate("AllEventReviews", { 
      placeId: event._id, 
      handleDeleteReview: (deletedReviewId) => {
        handleDeleteReview(deletedReviewId);
        fetchEventDetails();
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

  if (!event) {
    return (
      <View style={styles.loader}>
        <Text>Failed to load event details.</Text>
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
          title={event.name}
          color={COLORS.grey}
          icon={"create-outline"}
          color1={COLORS.grey}
          onPress={() => navigation.goBack()}
          onPress1={handleReviewsMock}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.container}>
            <NetworkImage
              source={event.imageUrl}
              width={"100%"}
              height={220}
              radius={25}
            />
          </View>

          <View style={styles.titleContainer}>
            <View style={styles.titleColumn}>
              <View style={styles.rowWithSpace("space-between")}>
                <ReusableText
                  text={event.name}
                  family={"medium"}
                  size={SIZES.xLarge}
                  color={COLORS.black}
                />
                <ReusableText
                  text={`${event.date}`}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.gray}
                />
              </View>
              <HeightSpacer height={10} />
              <ReusableText
                text={`${event.location.city}, ${event.location.country}`}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.black}
              />
              <HeightSpacer height={15} />
              <View style={styles.rowWithSpace("space-between")}>
                <Rating
                  maxStars={5}
                  stars={event.rating}
                  bordered={false}
                  color={COLORS.green}
                />
                <ReusableText
                  text={`(${event.reviewCount} reviews)`}
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
          <ExpandableText text={event.description} numberOfLines={3} />
          <HeightSpacer height={10} />
          <ReusableText
            text={"Location"}
            family={"medium"}
            size={SIZES.large}
            color={COLORS.black}
          />
          <HeightSpacer height={15} />
          <ReusableText
            text={`${event.location.city}, ${event.location.country}`}
            family={"regular"}
            size={SIZES.small + 2}
            color={COLORS.gray}
          />
          <TouchableOpacity onPress={handleNavigationToLocation} style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: event.coordinates.latitude,
                longitude: event.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
            >
              <Marker coordinate={event.coordinates} />
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
          <EventReviewsList reviews={event.reviews} onDeleteReview={handleDeleteReview} />
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

export default EventDetails;
