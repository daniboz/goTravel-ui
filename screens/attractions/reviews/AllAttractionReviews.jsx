import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AttractionReviewTle from "./AttractionReviewTle";
import AppBar from "../../../components/reusable/AppBar";
import { COLORS, TAB_BAR_HEIGHT } from "../../../constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchUserData = async (userId) => {
  try {
    console.log(`Fetching user data for userId: ${userId}`); // Debug log
    const response = await fetch(`http://localhost:5003/api/users/${userId}`);
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
        // Ensure userId is correctly extracted whether `user` is an object or a string
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




const AllAttractionReviews = ({ navigation, route }) => {
  const { reviews = [] } = route.params || {};
  const [reviewsWithUserDetails, setReviewsWithUserDetails] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchAndSetReviews = async () => {
      const detailedReviews = await fetchReviewsWithUserDetails(reviews);
      setReviewsWithUserDetails(detailedReviews);
    };

    const getUserId = async () => {
      const id = await AsyncStorage.getItem('id');
      setUserId(id);
    };

    fetchAndSetReviews();
    getUserId();
  }, [reviews]);

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
        onPress={() => navigation.goBack()}
      />
      <FlatList
        data={reviewsWithUserDetails}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.reviewContainer}>
            <AttractionReviewTle review={item} onDelete={handleDelete} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AllAttractionReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 50, // Adjust this value to move the content lower
  },
  contentContainer: {
    marginTop: 10,
    paddingBottom: TAB_BAR_HEIGHT,
  },
  reviewContainer: {
    marginBottom: 10,
  },
});
