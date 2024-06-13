import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Rating, RatingInput } from "react-native-stock-star-rating";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from 'react-native';
import HeightSpacer from "../../../components/reusable/HeightSpacer";
import ReusableText from "../../../components/reusable/ReusableText";
import ReusableBtn from "../../../components/reusable/ReusableBtn";
import AppBar from "../../../components/reusable/AppBar";
import { COLORS, SIZES } from "../../../constants/theme";
import { BASE_URL } from "../../../constants/config";

const AddAttractionReviews = ({ navigation }) => {
  const route = useRoute();
  const { placeId } = route.params;
  const [rating, setRating] = useState(0);
  const [reviewInput, setReviewInput] = useState("");

  const postReview = async () => {
    const userId = await AsyncStorage.getItem('id');
    if (!userId) {
      console.error('No user ID found in AsyncStorage');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const data = {
      placeId,
      userId,
      review: reviewInput,
      rating,
    };

    console.log('Posting review with data:', data);

    try {
      const response = await axios.post(`${BASE_URL}/api/attraction-reviews/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', response.data);

      if (response.status === 200) {
        navigation.replace("AttractionDetails", { attractionId: placeId });
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  return (
    <View>
      <View style={{ height: 100 }}>
        <AppBar
          top={60}
          left={20}
          right={20}
          title={'Add Your Review'}
          color={COLORS.grey}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ margin: 20, paddingTop: 30 }}>
        <ReusableText
          text={"Rate this attraction"}
          family={"medium"}
          size={SIZES.large - 3}
          color={COLORS.black}
        />

        <HeightSpacer height={15} />

        <RatingInput rating={rating} setRating={setRating} size={70} maxStars={5} bordered={false} color={COLORS.green} />

        <HeightSpacer height={15} />

        <ReusableText
          text={"Your review"}
          family={"medium"}
          size={SIZES.large - 3}
          color={COLORS.black}
        />

        <HeightSpacer height={15} />

        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            value={reviewInput}
            onChangeText={setReviewInput}
            placeholder="Write your thoughts on this attraction..."
            autoCapitalize="none"
          />
        </View>

        <HeightSpacer height={20} />

        <ReusableBtn
          onPress={postReview}
          btnText={"Submit your review"}
          width={SIZES.width - 50}
          backgroundColor={COLORS.green}
          borderColor={COLORS.green}
          borderWidth={0.5}
          textColor={COLORS.white}
        />
      </View>
    </View>
  );
};

export default AddAttractionReviews;

const styles = StyleSheet.create({
  input: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small
  },
  wrapper: {
    width: SIZES.width - 50,
    height: 50,
    backgroundColor: COLORS.lightWhite,
    marginRight: SIZES.small,
    borderRadius: SIZES.small
  }
});
