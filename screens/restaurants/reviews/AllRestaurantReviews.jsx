import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantReviewTle from "./RestaurantReviewTle";
import AppBar from "../../../components/reusable/AppBar";
import { COLORS, TAB_BAR_HEIGHT } from "../../../constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from "../../../constants/config";

const fetchUserData = async (userId) => {
  try {
    console.log(`Fetching user data for userId: ${userId}`);
    const response = await fetch(`${BASE_URL}/api/users/${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching user data for ${userId}:`, errorText);
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchUserData:', error);
    throw error;
  }
};

const fetchReviewsWithUserDetails = async (reviews) => {
  return await Promise.all(
    reviews.map(async (review) => {
      try {
        const userId = typeof review.user === 'object' ? review.user._id : review.user;
        if (!userId) {
          throw new Error('User ID is missing');
        }
        const userData = await fetchUserData(userId);
        return { ...review, user: userData };
      } catch (error) {
        console.error(`Error fetching user data for review: ${JSON.stringify(review)}`, error);
        return { ...review, user: null };
      }
    })
  );
};

const AllRestaurantReviews = ({ navigation, route }) => {
  const { placeId, handleDeleteReview } = route.params || {};
  const [reviewsWithUserDetails, setReviewsWithUserDetails] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchAndSetReviews = async () => {
    try {
      console.log(`Fetching reviews for restaurant ID: ${placeId}`);
      const response = await axios.get(`${BASE_URL}/api/restaurant-reviews/${placeId}/reviews`);
      console.log(`Fetched reviews response:`, response.data);
      const detailedReviews = await fetchReviewsWithUserDetails(response.data);
      setReviewsWithUserDetails(detailedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('id');
      setUserId(id);
    };

    fetchAndSetReviews();
    getUserId();
  }, [placeId]);

  const handleDelete = (reviewId) => {
    setReviewsWithUserDetails((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        top={10}
        left={0}
        right={0}
        title={"Reviews"}
        color={COLORS.grey}
        onPress={() => {
          handleDeleteReview();
          navigation.goBack();
        }}
      />
      <FlatList
        data={reviewsWithUserDetails}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer}>
            <RestaurantReviewTle review={item} onDelete={handleDelete} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AllRestaurantReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50,
  },
  contentContainer: {
    marginTop: 10,
    paddingBottom: TAB_BAR_HEIGHT,
  },
  reviewContainer: {
    marginBottom: 10,
  },
});
