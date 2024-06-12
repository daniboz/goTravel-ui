import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NetworkImage from "../../../components/reusable/NetworkImage";
import Rating from "../../../components/reusable/Rating";
import ReusableText from "../../../components/reusable/ReusableText";
import WidthSpacer from "../../../components/reusable/WidthSpacer";
import ExpandableText from "../../../components/reusable/ExpandableText";
import { COLORS, SIZES } from "../../../constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const AttractionReviewTle = ({ review, onDelete }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('id');
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleDelete = async () => {
    if (!userId) {
      console.error('No user ID found in AsyncStorage');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:5003/api/attraction-reviews/delete', {
        data: { reviewId: review._id, userId },
      });
      if (response.status === 200) {
        console.log(`Review with id: ${review._id} deleted successfully`);
        onDelete(review._id);
      } else {
        console.error('Failed to delete review:', response.data);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (!review.user) {
    console.error('No user data found for review:', review);
    return null; 
  }

  const isCurrentUser = review.user._id === userId;

  return (
    <View style={styles.reviewBorder}>
      <View style={styles.rowWithSpace("space-between")}>
        <View style={styles.rowWithSpace("flex-start")}>
          <NetworkImage source={review.user.profile} width={54} height={54} radius={10} />
          <WidthSpacer width={20} />
          <View style={{ width: isCurrentUser ? "70%" : "80%" }}>
            <View style={styles.rowWithSpace("space-between")}>
              <ReusableText text={review.user.username} family={"medium"} size={SIZES.small + 2} color={COLORS.black} />
              <WidthSpacer width={"30%"} />
              <View style={styles.rowWithSpace("space-between")}>
                <Rating rating={review.rating} />
                <WidthSpacer width={10} />
                <Text style={{ fontFamily: 'medium', fontSize: SIZES.small + 2, color: COLORS.black }}>
                  {review.updatedAt.split('T')[0]}
                </Text>
              </View>
            </View>
            <ExpandableText text={review.review} numberOfLines={2} />
          </View>
        </View>
        {isCurrentUser && (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={16} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewBorder: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGrey,
    position: 'relative',
  },
  rowWithSpace: (justifyContent) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: justifyContent,
  }),
  deleteButton: {
    backgroundColor: COLORS.green,
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  deleteButtonText: {
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default AttractionReviewTle;
