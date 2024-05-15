import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from "react-native-stock-star-rating";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES, TAB_BAR_HEIGHT } from '../../constants/theme';
import NetworkImage from '../../components/reusable/NetworkImage';
import HeightSpacer from '../../components/reusable/HeightSpacer';
import ReusableText from '../../components/reusable/ReusableText';
import ExpandableText from '../../components/reusable/ExpandableText';
import AppBar from '../../components/reusable/AppBar';
import RestaurantReviewsList from './reviews/RestaurantReviewsList';


const windowWidth = Dimensions.get('window').width;

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const RatingStars = ({ rating }) => (
    <View style={styles.ratingContainer}>
      {[...Array(rating)].map((_, index) => (
        <Ionicons key={index} name="star" size={24} color={COLORS.golden} />
      ))}
    </View>
  );

  const ReviewsSection = ({ reviews }) => (
    <View style={styles.reviewsSection}>
      {reviews.map(review => (
        <View key={review.id} style={styles.reviewCard}>
          <Text style={styles.reviewText}>{review.user.username} - {review.review}</Text>
          <RatingStars rating={review.rating} />
        </View>
      ))}
    </View>
  );

  const handleReviews = () => {
    if (userLogin) {
      navigation.navigate("AddRestaurantReviews", id);
    } else {
      Alert.alert("Auth Error", "Please login to add comments", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {navigation.navigate('AuthTop')},
        },
        { defaultIndex: 1 },
      ]);
    }
  };

  const handleReviewsMock = () => {
      navigation.navigate("AddRestaurantReviews");
  };

  return (
    <View style={styles.scrollView}>
      <View style={{ height: 80 }}>
          <AppBar
            top={50}
            left={20}
            right={20}
            title={restaurant.name}
            color={COLORS.grey}
            icon={"message1"}
            color1={COLORS.grey}
            onPress={() => navigation.goBack()}
            onPress1={handleReviewsMock}
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
                      color={"#FD9942"}
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

            <ExpandableText text={restaurant.description} numberOfLines={3}/>

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

            <View style={styles.rowWithSpace("space-between")}>
              <ReusableText
                text={"Reviews"}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.black}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate("AllRestaurantReviews", { reviews: restaurant.reviews })}
              >
                <Feather name="list" size={20} />
              </TouchableOpacity>
            </View>

            <HeightSpacer height={10} />

            <RestaurantReviewsList reviews={restaurant.reviews} />
        </View>

      </ScrollView>
    </View> 
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
    marginBottom: TAB_BAR_HEIGHT +28,
  },
  container: {
    paddingTop: 0,
    paddingHorizontal: 20,
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
    height:120,
    position:"absolute",
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
  map: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
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
