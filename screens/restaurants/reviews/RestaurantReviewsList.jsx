import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import RestaurantReviewTle from './RestaurantReviewTle';

const RestaurantReviewsList = ({ reviews }) => {
  return (
    <FlatList 
      data={reviews}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <RestaurantReviewTle review={item} />
        </View>
      )}
    />
  );
}

export default RestaurantReviewsList;

const styles = StyleSheet.create({});
